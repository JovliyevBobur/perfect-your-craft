import { memo, useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";

interface MindMapNodeData {
  label: string;
  isRoot?: boolean;
  onEdit: (id: string, label: string) => void;
}

const MindMapNode = ({ id, data, selected }: NodeProps<MindMapNodeData>) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(data.label);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditValue(data.label);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editValue.trim() && editValue !== data.label) {
      data.onEdit(id, editValue.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleBlur();
    }
    if (e.key === "Escape") {
      setIsEditing(false);
      setEditValue(data.label);
    }
  };

  return (
    <div
      className={`
        relative px-6 py-3 rounded-lg
        bg-card/80 backdrop-blur-sm
        border-2 border-primary
        transition-all duration-300 ease-out
        cursor-pointer select-none
        ${selected ? "neon-glow-strong scale-105" : "neon-glow"}
        ${data.isRoot ? "px-8 py-4 border-[3px]" : ""}
        hover:neon-glow-strong hover:scale-105
      `}
      onDoubleClick={handleDoubleClick}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-primary !border-primary !w-3 !h-3 opacity-0"
      />

      {isEditing ? (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="
            bg-transparent text-center text-foreground font-body
            outline-none border-b border-primary
            min-w-[80px] max-w-[200px]
          "
          autoFocus
        />
      ) : (
        <span
          className={`
            font-body text-foreground neon-text
            ${data.isRoot ? "text-lg font-display font-bold" : "text-sm"}
          `}
        >
          {data.label}
        </span>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-primary !border-primary !w-3 !h-3 opacity-0"
      />

      {/* Decorative corner brackets */}
      <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-primary opacity-60" />
      <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-primary opacity-60" />
      <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-primary opacity-60" />
      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-primary opacity-60" />
    </div>
  );
};

export default memo(MindMapNode);
