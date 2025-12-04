import { useEffect, useRef } from "react";
import { Plus, Trash2, Edit3, GitBranch } from "lucide-react";

interface ContextMenuProps {
  x: number;
  y: number;
  nodeId: string | null;
  onClose: () => void;
  onAddNode: () => void;
  onAddChild: () => void;
  onDeleteNode: () => void;
  onEditNode: () => void;
}

const ContextMenu = ({
  x,
  y,
  nodeId,
  onClose,
  onAddNode,
  onAddChild,
  onDeleteNode,
  onEditNode,
}: ContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const menuItems = nodeId
    ? [
        { icon: GitBranch, label: "Add Child", action: onAddChild },
        { icon: Edit3, label: "Edit Text", action: onEditNode },
        { icon: Trash2, label: "Delete Node", action: onDeleteNode, danger: true },
      ]
    : [{ icon: Plus, label: "Add Node", action: onAddNode }];

  return (
    <div
      ref={menuRef}
      className="
        fixed z-50 min-w-[180px]
        bg-card/95 backdrop-blur-md
        border-2 border-primary rounded-lg
        neon-glow overflow-hidden
        animate-in fade-in zoom-in-95 duration-150
      "
      style={{ left: x, top: y }}
    >
      <div className="p-1">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              item.action();
              onClose();
            }}
            className={`
              w-full flex items-center gap-3 px-4 py-2.5
              text-sm font-body text-foreground
              rounded-md transition-all duration-200
              hover:bg-primary/20 hover:neon-text
              ${item.danger ? "hover:text-destructive" : ""}
            `}
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
    </div>
  );
};

export default ContextMenu;
