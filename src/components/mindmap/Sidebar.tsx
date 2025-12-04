import {
  Plus,
  GitBranch,
  Trash2,
  Download,
  Upload,
  Save,
  FolderOpen,
  AlertTriangle,
} from "lucide-react";

interface SidebarProps {
  onAddNode: () => void;
  onAddChild: () => void;
  onDeleteNode: () => void;
  onExportJSON: () => void;
  onImportJSON: () => void;
  onSaveLocal: () => void;
  onLoadLocal: () => void;
  onClearAll: () => void;
  hasSelectedNode: boolean;
}

const Sidebar = ({
  onAddNode,
  onAddChild,
  onDeleteNode,
  onExportJSON,
  onImportJSON,
  onSaveLocal,
  onLoadLocal,
  onClearAll,
  hasSelectedNode,
}: SidebarProps) => {
  const buttons = [
    { icon: Plus, label: "NEW NODE", action: onAddNode, shortcut: "Ctrl+N" },
    {
      icon: GitBranch,
      label: "NEW CHILD",
      action: onAddChild,
      disabled: !hasSelectedNode,
      shortcut: "Ctrl+Enter",
    },
    {
      icon: Trash2,
      label: "DELETE NODE",
      action: onDeleteNode,
      disabled: !hasSelectedNode,
      danger: true,
      shortcut: "Delete",
    },
    { icon: Download, label: "EXPORT JSON", action: onExportJSON },
    { icon: Upload, label: "IMPORT JSON", action: onImportJSON },
    { icon: Save, label: "SAVE LOCAL", action: onSaveLocal, shortcut: "Ctrl+S" },
    { icon: FolderOpen, label: "LOAD LOCAL", action: onLoadLocal, shortcut: "Ctrl+O" },
    { icon: AlertTriangle, label: "CLEAR ALL", action: onClearAll, danger: true },
  ];

  const shortcuts = [
    "Ctrl+N: New Node",
    "Ctrl+S: Save",
    "Ctrl+O: Load",
    "Delete: Remove Node",
    "Enter: Edit Node",
    "Scroll: Zoom In/Out",
  ];

  return (
    <aside className="w-64 h-full bg-card/50 backdrop-blur-sm border-r-2 border-primary neon-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-primary/50">
        <h2 className="font-display text-lg text-foreground neon-text tracking-wider">
          CONTROLS
        </h2>
      </div>

      {/* Buttons */}
      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={btn.action}
            disabled={btn.disabled}
            className={`
              w-full flex items-center gap-3 px-4 py-3
              bg-card/80 border-2 border-primary/50 rounded-lg
              font-body text-sm text-foreground
              transition-all duration-300
              hover:border-primary hover:neon-glow hover:neon-text
              disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-primary/50 disabled:hover:shadow-none
              ${btn.danger ? "hover:border-destructive hover:text-destructive" : ""}
              group
            `}
          >
            <btn.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="flex-1 text-left tracking-wide">{btn.label}</span>
          </button>
        ))}
      </div>

      {/* Shortcuts Panel */}
      <div className="p-4 border-t border-primary/50 bg-card/30">
        <h3 className="font-display text-xs text-primary mb-3 tracking-widest">
          SHORTCUTS:
        </h3>
        <div className="space-y-1.5">
          {shortcuts.map((shortcut, index) => (
            <p
              key={index}
              className="font-body text-xs text-muted-foreground tracking-wide"
            >
              {shortcut}
            </p>
          ))}
        </div>
      </div>

      {/* Decorative footer line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
    </aside>
  );
};

export default Sidebar;
