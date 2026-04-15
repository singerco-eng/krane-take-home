import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, EllipsisVertical, Plus, Send, Trash2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { PROCUREMENT_LOG as ORIGINAL_LOG } from "@/data/procurement-log.js";
import { PROCUREMENT_LOG as REVISED_LOG } from "@/data/procurement-log-revised.js";
import { cn } from "@/lib/utils";
import { PageHeader, PageHeaderTitle } from "@/components/ui/page-header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableSortButton,
} from "@/components/ui/table";

type ProcurementItem = {
  id: number;
  specSection: string;
  description: string;
  basisOfDesign: string;
  leadTimeWeeks: string;
  flags: string[];
};

type EnrichedProcurementItem = ProcurementItem & {
  divisionLabel: string;
  divisionCode: string;
  substitutionRestrictions: string;
  ownerApproval: string;
  leadTimeMin: number;
  leadTimeMax: number;
};

type GroupedLogSection = {
  id: string;
  label: string;
  items: EnrichedProcurementItem[];
  sortOrder: number;
};

type SortKey =
  | "specSection"
  | "description"
  | "basisOfDesign"
  | "leadTime"
  | "substitutionRestrictions"
  | "ownerApproval"
  | "divisionLabel";

type SortDirection = "asc" | "desc";
type GroupBy = "none" | "leadTime" | "division";
type LeadTimeFilter = "all" | "gt12" | "gt26";
type RestrictionFilter = "all" | "restricted";
type OwnerApprovalFilter = "all" | "required";
type ViewMode = "current" | "future";

type ChangeType = "modified" | "added" | "removed";

type ItemChange = {
  type: ChangeType;
  fields?: string[];
};

const originalLog = ORIGINAL_LOG as ProcurementItem[];
const revisedLog = REVISED_LOG as ProcurementItem[];
const specPdfUrl = new URL("../data/specs/griffin-hospital-generator-upgrades.pdf", import.meta.url).href;
const divisionLabels: Record<string, string> = {
  "03": "Division 03 — Concrete",
  "21": "Division 21 — Fire Suppression",
  "23": "Division 23 — HVAC",
  "26": "Division 26 — Electrical",
};

const leadTimeFilterOptions: Array<{ value: LeadTimeFilter; label: string }> = [
  { value: "all", label: "All lead times" },
  { value: "gt12", label: "> 12 weeks" },
  { value: "gt26", label: "> 26 weeks" },
];

const groupingOptions: Array<{ value: GroupBy; label: string }> = [
  { value: "none", label: "Ungrouped" },
  { value: "leadTime", label: "Lead Time" },
  { value: "division", label: "Division" },
];

const baseEnrichedLog: EnrichedProcurementItem[] = originalLog.map((item) => {
  const leadTime = parseLeadTimeRange(item.leadTimeWeeks);
  const divisionCode = getDivisionCode(item.specSection);

  return {
    ...item,
    divisionCode,
    divisionLabel: getDivisionLabel(item.specSection),
    substitutionRestrictions: getSubstitutionRestrictions(item),
    ownerApproval: getOwnerApproval(item),
    leadTimeMin: leadTime.min,
    leadTimeMax: leadTime.max,
  };
});

const revisedEnrichedLog: EnrichedProcurementItem[] = revisedLog.map((item) => {
  const leadTime = parseLeadTimeRange(item.leadTimeWeeks);
  const divisionCode = getDivisionCode(item.specSection);

  return {
    ...item,
    divisionCode,
    divisionLabel: getDivisionLabel(item.specSection),
    substitutionRestrictions: getSubstitutionRestrictions(item),
    ownerApproval: getOwnerApproval(item),
    leadTimeMin: leadTime.min,
    leadTimeMax: leadTime.max,
  };
});

const currentStateLog = [...originalLog].sort((left, right) =>
  left.specSection.localeCompare(right.specSection, undefined, { numeric: true }),
);

const revisedCurrentStateLog = [...revisedLog].sort((left, right) =>
  left.specSection.localeCompare(right.specSection, undefined, { numeric: true }),
);

function computeChanges(
  original: ProcurementItem[],
  revised: ProcurementItem[],
): Map<number, ItemChange> {
  const changes = new Map<number, ItemChange>();
  const originalById = new Map(original.map((item) => [item.id, item]));
  const revisedById = new Map(revised.map((item) => [item.id, item]));

  for (const [id, revisedItem] of revisedById) {
    const originalItem = originalById.get(id);

    if (!originalItem) {
      changes.set(id, { type: "added" });
      continue;
    }

    const changedFields: string[] = [];

    if (originalItem.description !== revisedItem.description) changedFields.push("description");
    if (originalItem.basisOfDesign !== revisedItem.basisOfDesign) changedFields.push("basisOfDesign");
    if (originalItem.leadTimeWeeks !== revisedItem.leadTimeWeeks) changedFields.push("leadTimeWeeks");

    if (changedFields.length > 0) {
      changes.set(id, { type: "modified", fields: changedFields });
    }
  }

  for (const [id] of originalById) {
    if (!revisedById.has(id)) {
      changes.set(id, { type: "removed" });
    }
  }

  return changes;
}

const csvHeaders = [
  "Spec Section",
  "Description",
  "Basis of Design",
  "Lead Time (est.)",
  "Substitution Restrictions",
  "Owner Approval",
  "Division",
];

function escapeCsvValue(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-|-$/g, "");
}

function downloadCurrentLogCsv(items: EnrichedProcurementItem[], contextLabel?: string) {
  const rows = items.map((item) =>
    [
      item.specSection,
      item.description,
      item.basisOfDesign,
      `${item.leadTimeWeeks} weeks`,
      item.substitutionRestrictions,
      item.ownerApproval,
      item.divisionLabel,
    ]
      .map(escapeCsvValue)
      .join(","),
  );
  const csv = [csvHeaders.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const suffix = contextLabel ? `-${slugify(contextLabel)}` : "";

  link.href = url;
  link.download = `griffin-hospital${suffix}.csv`;
  link.click();

  URL.revokeObjectURL(url);
}

function downloadCurrentStateCsv(items: ProcurementItem[]) {
  const headers = ["Spec Section", "Description", "Basis of Design"];
  const rows = items.map((item) =>
    [item.specSection, item.description, item.basisOfDesign].map(escapeCsvValue).join(","),
  );
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "griffin-hospital-procurement-log.csv";
  link.click();

  URL.revokeObjectURL(url);
}

function parseLeadTimeRange(value: string) {
  const [minString, maxString = minString] = value.split("-");

  return {
    min: Number(minString),
    max: Number(maxString),
  };
}

function getDivisionCode(specSection: string) {
  const digitsOnly = specSection.replaceAll(/\D/g, "");
  return digitsOnly.slice(0, 2).padStart(2, "0");
}

function getDivisionLabel(specSection: string) {
  const divisionCode = getDivisionCode(specSection);
  return divisionLabels[divisionCode] ?? `Division ${divisionCode}`;
}

function getSubstitutionRestrictions(item: ProcurementItem) {
  const text = item.basisOfDesign.toLowerCase();
  const prefix = item.basisOfDesign.split("—")[0].toLowerCase().trim();
  const prefixOriginalCase = item.basisOfDesign.split("—")[0].trim();

  if (
    item.flags.includes("Owner-furnished equipment") ||
    item.flags.includes("Sole-source specified") ||
    text.includes("procured by griffin healthcare")
  ) {
    return "Sole-source / owner-furnished";
  }

  if (text.includes("acceptable equivalent")) {
    return "Named products, acceptable equivalent";
  }

  if (text.includes("or equivalent") || text.includes("equivalent meeting spec requirements")) {
    return "Named products, equivalent allowed";
  }

  // "or [Manufacturer(s)] equivalent" — e.g., "or Vibro-Acoustics equivalent"
  if (/\bor\s+\S+\s+equivalent\b/i.test(text)) {
    return "Named products, equivalent allowed";
  }

  // Named manufacturers separated by "or" (with or without commas)
  if (prefix.includes(" or ")) {
    return "Named products only";
  }

  // Category-structured specs with colons (e.g., "Ball valves: Conbraco/Apollo")
  if (prefix.includes(":")) {
    return "Named products only";
  }

  // Slash-separated manufacturer names (e.g., "Lamicoid/Seton/Brady")
  if (/[A-Z][a-z]+(?:\/[A-Z][a-z]+)+/.test(prefixOriginalCase)) {
    return "Named products only";
  }

  // Single named manufacturer, no equivalent language (e.g., "Square D, ...")
  if (/^[A-Z][a-z]+ [A-Z]/.test(item.basisOfDesign) && !text.includes("equivalent")) {
    return "Named products only";
  }

  return "No explicit restriction";
}

function getOwnerApproval(item: ProcurementItem) {
  const text = item.basisOfDesign.toLowerCase();

  if (item.flags.includes("Owner-furnished equipment") || text.includes("procured by griffin healthcare")) {
    return "Required before bid";
  }

  return "Not indicated";
}

function matchesLeadTimeFilter(item: EnrichedProcurementItem, filter: LeadTimeFilter) {
  if (filter === "all") {
    return true;
  }

  const threshold = filter === "gt26" ? 26 : 12;
  return item.leadTimeMax > threshold;
}

function isRestricted(item: EnrichedProcurementItem) {
  return item.substitutionRestrictions !== "No explicit restriction";
}

function handleDivisionSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
  return event.target.value;
}

function sortItems(items: EnrichedProcurementItem[], sortKey: SortKey, sortDirection: SortDirection) {
  return [...items].sort((left, right) => {
    const multiplier = sortDirection === "asc" ? 1 : -1;

    if (sortKey === "leadTime") {
      if (left.leadTimeMax !== right.leadTimeMax) {
        return (left.leadTimeMax - right.leadTimeMax) * multiplier;
      }

      if (left.leadTimeMin !== right.leadTimeMin) {
        return (left.leadTimeMin - right.leadTimeMin) * multiplier;
      }

      return (Number(left.specSection) - Number(right.specSection)) * multiplier;
    }

    const leftValue = getSortableValue(left, sortKey);
    const rightValue = getSortableValue(right, sortKey);

    return leftValue.localeCompare(rightValue, undefined, { numeric: true, sensitivity: "base" }) * multiplier;
  });
}

function buildGroupedLog(items: EnrichedProcurementItem[], groupBy: GroupBy) {
  if (groupBy === "none") {
    return [];
  }

  const groups = new Map<string, GroupedLogSection>();

  for (const item of items) {
    const id = groupBy === "leadTime" ? `lead-time-${item.leadTimeWeeks}` : `division-${item.divisionCode}`;
    const label = groupBy === "leadTime" ? `${item.leadTimeWeeks} weeks` : item.divisionLabel;
    const sortOrder = groupBy === "leadTime" ? -(item.leadTimeMax * 1000 + item.leadTimeMin) : Number(item.divisionCode);
    const existingGroup = groups.get(id);

    if (existingGroup) {
      existingGroup.items.push(item);
      continue;
    }

    groups.set(id, {
      id,
      label,
      items: [item],
      sortOrder,
    });
  }

  return [...groups.values()].sort((left, right) => {
    if (left.sortOrder !== right.sortOrder) {
      return left.sortOrder - right.sortOrder;
    }

    return left.label.localeCompare(right.label, undefined, { numeric: true, sensitivity: "base" });
  });
}

function SendToSubModal({
  isOpen,
  items,
  contextLabel,
  onAssign,
  onClose,
}: {
  isOpen: boolean;
  items: EnrichedProcurementItem[];
  contextLabel: string;
  onAssign: (subName: string) => void;
  onClose: () => void;
}) {
  const [subName, setSubName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = subName.trim();
    if (!trimmed) return;
    onAssign(trimmed);
    setSubName("");
    onClose();
  }

  function handleExport() {
    downloadCurrentLogCsv(items, contextLabel);
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-50 w-full max-w-sm rounded-2xl border border-border/60 bg-card p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-foreground">Assign Sub</h3>
          <button
            type="button"
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="mb-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{contextLabel}</span>
          {" "}&middot; {items.length} item{items.length !== 1 && "s"}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            ref={inputRef}
            type="text"
            placeholder="Sub name..."
            value={subName}
            onChange={(event) => setSubName(event.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus:ring-2 focus:ring-ring"
          />
          <div className="flex items-center justify-between">
            <Button type="button" size="sm" variant="outline" onClick={handleExport}>
              Export {items.length} to CSV
            </Button>
            <div className="flex gap-2">
              <Button type="button" size="sm" variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={!subName.trim()}>
                Assign
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}

function SendToSubTrigger({
  items,
  contextLabel,
  onAssign,
  className,
}: {
  items: EnrichedProcurementItem[];
  contextLabel: string;
  onAssign: (subName: string) => void;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={className}>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setIsOpen(true)}
        disabled={items.length === 0}
      >
        <Send className="mr-2 h-3.5 w-3.5" />
        Assign Sub
        {items.length > 0 && (
          <Badge variant="secondary" className="ml-2">{items.length}</Badge>
        )}
      </Button>
      <SendToSubModal
        isOpen={isOpen}
        items={items}
        contextLabel={contextLabel}
        onAssign={onAssign}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}

function SubCell({
  item,
  sub,
  onAssignSub,
  onRemoveSub,
}: {
  item: EnrichedProcurementItem;
  sub: string | undefined;
  onAssignSub: (subName: string) => void;
  onRemoveSub: () => void;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <TableCell>
      <div className="flex items-center gap-2">
        {sub ? (
          <Badge variant="secondary">{sub}</Badge>
        ) : (
          <span className="text-muted-foreground/50">—</span>
        )}
        <RowActionMenu
          hasSubAssigned={!!sub}
          onSendToSub={() => setModalOpen(true)}
          onRemoveSub={onRemoveSub}
        />
      </div>
      <SendToSubModal
        isOpen={modalOpen}
        items={[item]}
        contextLabel={item.description}
        onAssign={onAssignSub}
        onClose={() => setModalOpen(false)}
      />
    </TableCell>
  );
}

function RowActionMenu({
  hasSubAssigned,
  onSendToSub,
  onRemoveSub,
}: {
  hasSubAssigned: boolean;
  onSendToSub: () => void;
  onRemoveSub: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  function openMenu() {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPos({ top: rect.bottom + 4, left: rect.right });
    }
    setIsOpen(true);
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground/60 transition-colors hover:bg-accent hover:text-foreground"
        onClick={openMenu}
      >
        <EllipsisVertical className="h-4 w-4" />
      </button>
      {isOpen && createPortal(
        <>
          <div className="fixed inset-0 z-50" onClick={() => setIsOpen(false)} />
          <div
            className="fixed z-50 min-w-[160px] rounded-lg border border-border/60 bg-card p-1 shadow-lg"
            style={{ top: menuPos.top, left: menuPos.left, transform: "translateX(-100%)" }}
          >
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent"
              onClick={() => { setIsOpen(false); onSendToSub(); }}
            >
              <Send className="h-3.5 w-3.5" />
              {hasSubAssigned ? "Reassign" : "Assign Sub"}
            </button>
            {hasSubAssigned && (
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
                onClick={() => { setIsOpen(false); onRemoveSub(); }}
              >
                <Trash2 className="h-3.5 w-3.5" />
                Remove Sub
              </button>
            )}
          </div>
        </>,
        document.body,
      )}
    </>
  );
}

function CurrentStateTable({
  items,
  itemChanges,
}: {
  items: EnrichedProcurementItem[];
  itemChanges: Map<number, ItemChange> | null;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Spec Section</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Basis of Design</TableHead>
          <TableHead>Division</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => {
          const change = itemChanges?.get(item.id);

          return (
            <TableRow key={item.id} className={cn(change?.type === "removed" && "opacity-50")}>
              <TableCell className="font-medium">{item.specSection}</TableCell>
              <TableCell>
                <span className="flex items-center gap-2">
                  {item.description}
                  {change?.type === "added" && (
                    <Badge variant="outline" className="border-emerald-500/50 text-emerald-600 text-xs">
                      <Plus className="mr-0.5 h-3 w-3" />New
                    </Badge>
                  )}
                  {change?.type === "removed" && (
                    <Badge variant="outline" className="border-red-500/50 text-red-500 text-xs">Removed</Badge>
                  )}
                </span>
              </TableCell>
              <TableCell className="max-w-md text-sm text-muted-foreground">
                {item.basisOfDesign}
                {change?.type === "modified" && change.fields?.includes("basisOfDesign") && (
                  <span className="mt-1 block text-xs text-amber-600">Spec changed</span>
                )}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">{item.divisionLabel}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

function ProcurementTable({
  items,
  sortKey,
  sortDirection,
  onSort,
  subAssignments,
  itemChanges,
  onAssignSub,
  onRemoveSub,
}: {
  items: EnrichedProcurementItem[];
  sortKey: SortKey;
  sortDirection: SortDirection;
  onSort: (nextKey: SortKey) => void;
  subAssignments: Map<number, string>;
  itemChanges: Map<number, ItemChange> | null;
  onAssignSub: (itemIds: number[], subName: string) => void;
  onRemoveSub: (itemId: number) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead aria-sort={getAriaSort(sortKey, sortDirection, "specSection")}>
            <TableSortButton active={sortKey === "specSection"} direction={sortDirection} onClick={() => onSort("specSection")}>
              Spec Section
            </TableSortButton>
          </TableHead>
          <TableHead aria-sort={getAriaSort(sortKey, sortDirection, "description")}>
            <TableSortButton active={sortKey === "description"} direction={sortDirection} onClick={() => onSort("description")}>
              Description
            </TableSortButton>
          </TableHead>
          <TableHead aria-sort={getAriaSort(sortKey, sortDirection, "basisOfDesign")}>
            <TableSortButton active={sortKey === "basisOfDesign"} direction={sortDirection} onClick={() => onSort("basisOfDesign")}>
              Basis of Design
            </TableSortButton>
          </TableHead>
          <TableHead aria-sort={getAriaSort(sortKey, sortDirection, "leadTime")}>
            <TableSortButton active={sortKey === "leadTime"} direction={sortDirection} onClick={() => onSort("leadTime")}>
              Lead Time (est.)
            </TableSortButton>
          </TableHead>
          <TableHead aria-sort={getAriaSort(sortKey, sortDirection, "substitutionRestrictions")}>
            <TableSortButton
              active={sortKey === "substitutionRestrictions"}
              direction={sortDirection}
              onClick={() => onSort("substitutionRestrictions")}
            >
              Substitution Restrictions
            </TableSortButton>
          </TableHead>
          <TableHead aria-sort={getAriaSort(sortKey, sortDirection, "ownerApproval")}>
            <TableSortButton active={sortKey === "ownerApproval"} direction={sortDirection} onClick={() => onSort("ownerApproval")}>
              Owner Approval
            </TableSortButton>
          </TableHead>
          <TableHead aria-sort={getAriaSort(sortKey, sortDirection, "divisionLabel")}>
            <TableSortButton active={sortKey === "divisionLabel"} direction={sortDirection} onClick={() => onSort("divisionLabel")}>
              Division
            </TableSortButton>
          </TableHead>
          <TableHead className="w-40">Sub</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => {
          const sub = subAssignments.get(item.id);
          const change = itemChanges?.get(item.id);

          return (
            <TableRow key={item.id} className={cn(change?.type === "removed" && "opacity-50")}>
              <TableCell className="font-medium">{item.specSection}</TableCell>
              <TableCell className="font-medium text-foreground">
                <span className="flex items-center gap-2">
                  {item.description}
                  {change?.type === "added" && (
                    <Badge variant="outline" className="border-emerald-500/50 text-emerald-600 text-xs">
                      <Plus className="mr-0.5 h-3 w-3" />New
                    </Badge>
                  )}
                  {change?.type === "removed" && (
                    <Badge variant="outline" className="border-red-500/50 text-red-500 text-xs">Removed</Badge>
                  )}
                </span>
              </TableCell>
              <TableCell className="max-w-md text-sm text-muted-foreground">
                {item.basisOfDesign}
                {change?.type === "modified" && change.fields?.includes("basisOfDesign") && (
                  <span className="mt-1 block text-xs text-amber-600">Spec changed</span>
                )}
              </TableCell>
              <TableCell>
                <span className={cn(change?.type === "modified" && change.fields?.includes("leadTimeWeeks") && "text-amber-600 font-medium")}>
                  {item.leadTimeWeeks} weeks
                </span>
                {change?.type === "modified" && change.fields?.includes("leadTimeWeeks") && (
                  <span className="mt-0.5 block text-xs text-amber-600">Changed</span>
                )}
              </TableCell>
              <TableCell>
                <span className={cn(isRestricted(item) ? "text-foreground" : "text-muted-foreground")}>
                  {item.substitutionRestrictions}
                </span>
              </TableCell>
              <TableCell>
                <span className={cn(item.ownerApproval === "Required before bid" ? "text-foreground" : "text-muted-foreground")}>
                  {item.ownerApproval}
                </span>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">{item.divisionLabel}</TableCell>
              <SubCell
                item={item}
                sub={sub}
                onAssignSub={(subName) => onAssignSub([item.id], subName)}
                onRemoveSub={() => onRemoveSub(item.id)}
              />
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>("current");
  const [sortKey, setSortKey] = useState<SortKey>("leadTime");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [groupBy, setGroupBy] = useState<GroupBy>("none");
  const [selectedDivision, setSelectedDivision] = useState<string>("all");
  const [leadTimeFilter, setLeadTimeFilter] = useState<LeadTimeFilter>("all");
  const [restrictionFilter, setRestrictionFilter] = useState<RestrictionFilter>("all");
  const [ownerApprovalFilter, setOwnerApprovalFilter] = useState<OwnerApprovalFilter>("all");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [subAssignments, setSubAssignments] = useState<Map<number, string>>(new Map());
  const [selectedSub, setSelectedSub] = useState<string>("all");
  const [useRevisedSpec, setUseRevisedSpec] = useState(false);

  const itemChanges = useMemo(
    () => (useRevisedSpec ? computeChanges(originalLog, revisedLog) : null),
    [useRevisedSpec],
  );

  const activeEnrichedLog = useMemo(() => {
    if (!useRevisedSpec || !itemChanges) return baseEnrichedLog;
    const removedItems = baseEnrichedLog.filter((item) => itemChanges.get(item.id)?.type === "removed");
    return [...revisedEnrichedLog, ...removedItems];
  }, [useRevisedSpec, itemChanges]);

  const activeCurrentStateLog = useMemo(() => {
    if (!useRevisedSpec || !itemChanges) return currentStateLog;
    const removedItems = currentStateLog.filter((item) => itemChanges.get(item.id)?.type === "removed");
    return [...revisedCurrentStateLog, ...removedItems];
  }, [useRevisedSpec, itemChanges]);

  const divisionOptions = useMemo(
    () =>
      [...new Set(activeEnrichedLog.map((item) => item.divisionLabel))].sort((left, right) =>
        left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" }),
      ),
    [activeEnrichedLog],
  );

  const subOptions = useMemo(() => {
    const names = new Set(subAssignments.values());
    return [...names].sort((left, right) => left.localeCompare(right, undefined, { sensitivity: "base" }));
  }, [subAssignments]);

  const filteredLog = useMemo(() => {
    return activeEnrichedLog.filter((item) => {
      if (selectedDivision !== "all" && item.divisionLabel !== selectedDivision) {
        return false;
      }

      if (!matchesLeadTimeFilter(item, leadTimeFilter)) {
        return false;
      }

      if (restrictionFilter === "restricted" && !isRestricted(item)) {
        return false;
      }

      if (ownerApprovalFilter === "required" && item.ownerApproval !== "Required before bid") {
        return false;
      }

      if (selectedSub === "assigned" && !subAssignments.has(item.id)) {
        return false;
      }

      if (selectedSub === "unassigned" && subAssignments.has(item.id)) {
        return false;
      }

      if (selectedSub !== "all" && selectedSub !== "assigned" && selectedSub !== "unassigned" && subAssignments.get(item.id) !== selectedSub) {
        return false;
      }

      return true;
    });
  }, [activeEnrichedLog, leadTimeFilter, ownerApprovalFilter, restrictionFilter, selectedDivision, selectedSub, subAssignments]);

  const visibleLog = useMemo(() => sortItems(filteredLog, sortKey, sortDirection), [filteredLog, sortDirection, sortKey]);
  const groupedLog = useMemo(() => buildGroupedLog(visibleLog, groupBy), [groupBy, visibleLog]);
  const hasActiveFilters =
    selectedDivision !== "all" ||
    leadTimeFilter !== "all" ||
    restrictionFilter !== "all" ||
    ownerApprovalFilter !== "all" ||
    selectedSub !== "all";

  const filterContextLabel = useMemo(() => {
    if (!hasActiveFilters) return "All items";
    const parts: string[] = [];
    if (selectedDivision !== "all") parts.push(selectedDivision);
    if (leadTimeFilter !== "all") {
      const option = leadTimeFilterOptions.find((o) => o.value === leadTimeFilter);
      if (option) parts.push(option.label);
    }
    if (restrictionFilter === "restricted") parts.push("Restricted");
    if (ownerApprovalFilter === "required") parts.push("Owner approval required");
    if (selectedSub !== "all") {
      if (selectedSub === "assigned") parts.push("Assigned");
      else if (selectedSub === "unassigned") parts.push("Unassigned");
      else parts.push(selectedSub);
    }
    return parts.join(" · ");
  }, [hasActiveFilters, selectedDivision, leadTimeFilter, restrictionFilter, ownerApprovalFilter, selectedSub]);

  function toggleSort(nextKey: SortKey) {
    if (nextKey === sortKey) {
      setSortDirection((currentDirection) => (currentDirection === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(nextKey);
    setSortDirection(nextKey === "leadTime" ? "desc" : "asc");
  }

  function clearAllFilters() {
    setSelectedDivision("all");
    setLeadTimeFilter("all");
    setRestrictionFilter("all");
    setOwnerApprovalFilter("all");
    setSelectedSub("all");
  }

  function setGroupOpen(groupId: string, open: boolean) {
    setOpenGroups((current) => ({
      ...current,
      [groupId]: open,
    }));
  }

  function assignSubToItems(itemIds: number[], subName: string) {
    setSubAssignments((current) => {
      const next = new Map(current);
      for (const id of itemIds) {
        next.set(id, subName);
      }
      return next;
    });
  }

  function removeSubFromItem(itemId: number) {
    setSubAssignments((current) => {
      const next = new Map(current);
      next.delete(itemId);
      return next;
    });
  }

  return (
    <Tabs defaultValue="current" value={viewMode} onValueChange={(value) => setViewMode(value as ViewMode)}>
    <main className="min-h-screen">
      <PageHeader>
        <div className="container grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-6">
          <PageHeaderTitle
            title="Griffin Hospital"
            description="Emergency Generator & Distribution Upgrades"
          />
          <TabsList>
            <TabsTrigger value="current">Current State</TabsTrigger>
            <TabsTrigger value="future">Future State</TabsTrigger>
          </TabsList>
          <div className="flex flex-wrap items-center justify-end gap-3">
            <Button
              variant={useRevisedSpec ? "default" : "outline"}
              size="sm"
              onClick={() => setUseRevisedSpec(!useRevisedSpec)}
            >
              {useRevisedSpec ? "Viewing Addendum #2" : "Load Revised Spec"}
            </Button>
            <Button
              variant="gradient"
              onClick={() =>
                viewMode === "current"
                  ? downloadCurrentStateCsv(activeCurrentStateLog)
                  : downloadCurrentLogCsv(visibleLog)
              }
            >
              Export to CSV
            </Button>
            <Button asChild variant="outline">
              <a href={specPdfUrl} target="_blank" rel="noreferrer">
                View Source Spec
              </a>
            </Button>
          </div>
        </div>
      </PageHeader>

      <section className="container py-10">
        <div className="rounded-3xl border border-border/60 bg-card/70 p-6 shadow-soft backdrop-blur">
          {viewMode === "current" ? (
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{activeEnrichedLog.length}</span> items sorted by spec section.
              </p>
              <CurrentStateTable items={activeEnrichedLog} itemChanges={itemChanges} />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border/60 bg-background/70 p-5">
                <div className="flex flex-col gap-4">
                  <div className="grid gap-3 xl:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr_auto] xl:items-end">
                    <label className="space-y-2">
                      <span className="text-sm font-medium text-foreground">Division</span>
                      <select
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus:ring-2 focus:ring-ring"
                        value={selectedDivision}
                        onChange={(event) => setSelectedDivision(handleDivisionSelectChange(event))}
                      >
                        <option value="all">All divisions</option>
                        {divisionOptions.map((divisionLabel) => (
                          <option key={divisionLabel} value={divisionLabel}>
                            {divisionLabel}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-medium text-foreground">Lead Time</span>
                      <select
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus:ring-2 focus:ring-ring"
                        value={leadTimeFilter}
                        onChange={(event) => setLeadTimeFilter(event.target.value as LeadTimeFilter)}
                      >
                        {leadTimeFilterOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-medium text-foreground">Restrictions</span>
                      <select
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus:ring-2 focus:ring-ring"
                        value={restrictionFilter}
                        onChange={(event) => setRestrictionFilter(event.target.value as RestrictionFilter)}
                      >
                        <option value="all">All items</option>
                        <option value="restricted">Restricted only</option>
                      </select>
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-medium text-foreground">Owner Approval</span>
                      <select
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus:ring-2 focus:ring-ring"
                        value={ownerApprovalFilter}
                        onChange={(event) => setOwnerApprovalFilter(event.target.value as OwnerApprovalFilter)}
                      >
                        <option value="all">All items</option>
                        <option value="required">Required only</option>
                      </select>
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-medium text-foreground">Sub</span>
                      <select
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus:ring-2 focus:ring-ring"
                        value={selectedSub}
                        onChange={(event) => setSelectedSub(event.target.value)}
                      >
                        <option value="all">All items</option>
                        <option value="assigned">Assigned</option>
                        <option value="unassigned">Unassigned</option>
                        {subOptions.map((sub) => (
                          <option key={sub} value={sub}>
                            {sub}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-medium text-foreground">Grouping</span>
                      <select
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus:ring-2 focus:ring-ring"
                        value={groupBy}
                        onChange={(event) => setGroupBy(event.target.value as GroupBy)}
                      >
                        {groupingOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <Button size="sm" variant="ghost" onClick={clearAllFilters} disabled={!hasActiveFilters} className="xl:self-end">
                      Clear all
                    </Button>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4">
                    <p className="text-sm text-muted-foreground">
                      Showing <span className="font-medium text-foreground">{visibleLog.length}</span> of{" "}
                      <span className="font-medium text-foreground">{activeEnrichedLog.length}</span> items.
                    </p>
                    {groupBy === "none" && (
                      <SendToSubTrigger
                        items={visibleLog}
                        contextLabel={filterContextLabel}
                        onAssign={(subName) => assignSubToItems(visibleLog.map((item) => item.id), subName)}
                      />
                    )}
                  </div>
                </div>
              </div>

              {visibleLog.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border/60 bg-background/50 px-6 py-12 text-center">
                  <p className="text-base font-medium text-foreground">No items match the current filters.</p>
                  <p className="mt-2 text-sm text-muted-foreground">Clear one or more filters to bring scope items back into view.</p>
                </div>
              ) : groupBy === "none" ? (
                <ProcurementTable
                  items={visibleLog}
                  sortKey={sortKey}
                  sortDirection={sortDirection}
                  onSort={toggleSort}
                  subAssignments={subAssignments}
                  itemChanges={itemChanges}
                  onAssignSub={assignSubToItems}
                  onRemoveSub={removeSubFromItem}
                />
              ) : (
                <div className="space-y-4">
                  {groupedLog.map((group) => {
                    const isOpen = openGroups[group.id] ?? true;

                    return (
                      <Collapsible
                        key={group.id}
                        open={isOpen}
                        onOpenChange={(open) => setGroupOpen(group.id, open)}
                        className="rounded-2xl border border-border/60 bg-background/60 p-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <CollapsibleTrigger asChild>
                            <button
                              type="button"
                              className="flex flex-1 items-center gap-3 text-left"
                            >
                              <div className="flex flex-wrap items-center gap-3">
                                <div>
                                  <p className="text-base font-semibold text-foreground">{group.label}</p>
                                </div>
                                <Badge variant="secondary">{group.items.length} items</Badge>
                              </div>
                              <ChevronDown
                                className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", isOpen && "rotate-180")}
                              />
                            </button>
                          </CollapsibleTrigger>
                          <SendToSubTrigger
                            items={group.items}
                            contextLabel={group.label}
                            onAssign={(subName) => assignSubToItems(group.items.map((item) => item.id), subName)}
                          />
                        </div>
                        <CollapsibleContent className="pt-4">
                          <ProcurementTable
                            items={group.items}
                            sortKey={sortKey}
                            sortDirection={sortDirection}
                            onSort={toggleSort}
                            subAssignments={subAssignments}
                            itemChanges={itemChanges}
                            onAssignSub={assignSubToItems}
                            onRemoveSub={removeSubFromItem}
                          />
                        </CollapsibleContent>
                      </Collapsible>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
    </Tabs>
  );
}

function getSortableValue(item: EnrichedProcurementItem, sortKey: Exclude<SortKey, "leadTime">) {
  return item[sortKey];
}

function getAriaSort(currentKey: SortKey, direction: SortDirection, columnKey: SortKey) {
  if (currentKey !== columnKey) {
    return "none";
  }

  return direction === "asc" ? "ascending" : "descending";
}

export default App;
