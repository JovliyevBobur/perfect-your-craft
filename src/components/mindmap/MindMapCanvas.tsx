import { useCallback, useRef, useState, useEffect } from "react";
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  NodeTypes,
  ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";
import { toast } from "sonner";

import MindMapNode from "./MindMapNode";
import ContextMenu from "./ContextMenu";
import Sidebar from "./Sidebar";
import Header from "./Header";

const nodeTypes: NodeTypes = {
  mindmap: MindMapNode,
};

const initialNodes: Node[] = [
  {
    id: "root",
    type: "mindmap",
    position: { x: 400, y: 300 },
    data: { label: "Central Idea", isRoot: true, onEdit: () => {} },
  },
];

const initialEdges: Edge[] = [];

const STORAGE_KEY = "mindnet-data";

const MindMapCanvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    nodeId: string | null;
  } | null>(null);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update node data with edit handler
  const updateNodesWithEditHandler = useCallback(
    (nodesToUpdate: Node[]) => {
      return nodesToUpdate.map((node) => ({
        ...node,
        data: {
          ...node.data,
          onEdit: (id: string, label: string) => {
            setNodes((nds) =>
              nds.map((n) =>
                n.id === id ? { ...n, data: { ...n.data, label } } : n
              )
            );
          },
        },
      }));
    },
    [setNodes]
  );

  // Initialize nodes with edit handler
  useEffect(() => {
    setNodes((nds) => updateNodesWithEditHandler(nds));
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    const saveData = () => {
      const data = {
        nodes: nodes.map(({ id, type, position, data: { label, isRoot } }) => ({
          id,
          type,
          position,
          data: { label, isRoot },
        })),
        edges,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    };

    const timeoutId = setTimeout(saveData, 1000);
    return () => clearTimeout(timeoutId);
  }, [nodes, edges]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const { nodes: savedNodes, edges: savedEdges } = JSON.parse(savedData);
        if (savedNodes?.length) {
          setNodes(updateNodesWithEditHandler(savedNodes));
          setEdges(savedEdges || []);
          toast.success("Previous session restored");
        }
      } catch (e) {
        console.error("Failed to load saved data:", e);
      }
    }
  }, []);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "smoothstep",
            animated: true,
            style: { stroke: "hsl(120 100% 50%)", strokeWidth: 2 },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node.id);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setContextMenu(null);
  }, []);

  const onContextMenu = useCallback(
    (event: React.MouseEvent, node?: Node) => {
      event.preventDefault();
      setContextMenu({
        x: event.clientX,
        y: event.clientY,
        nodeId: node?.id || null,
      });
      if (node) {
        setSelectedNode(node.id);
      }
    },
    []
  );

  const generateId = () => `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const addNode = useCallback(
    (parentId?: string) => {
      const newId = generateId();
      const parentNode = parentId ? nodes.find((n) => n.id === parentId) : null;

      const position = parentNode
        ? {
            x: parentNode.position.x + (Math.random() - 0.5) * 200,
            y: parentNode.position.y + 150,
          }
        : reactFlowInstance
        ? reactFlowInstance.project({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
          })
        : { x: 400, y: 300 };

      const newNode: Node = {
        id: newId,
        type: "mindmap",
        position,
        data: {
          label: "New Node",
          onEdit: (id: string, label: string) => {
            setNodes((nds) =>
              nds.map((n) =>
                n.id === id ? { ...n, data: { ...n.data, label } } : n
              )
            );
          },
        },
      };

      setNodes((nds) => [...nds, newNode]);

      if (parentId) {
        const newEdge: Edge = {
          id: `edge-${parentId}-${newId}`,
          source: parentId,
          target: newId,
          type: "smoothstep",
          animated: true,
          style: { stroke: "hsl(120 100% 50%)", strokeWidth: 2 },
        };
        setEdges((eds) => [...eds, newEdge]);
      }

      toast.success(parentId ? "Child node added" : "Node added");
    },
    [nodes, reactFlowInstance, setNodes, setEdges]
  );

  const deleteNode = useCallback(() => {
    if (!selectedNode || selectedNode === "root") {
      if (selectedNode === "root") {
        toast.error("Cannot delete root node");
      }
      return;
    }

    setNodes((nds) => nds.filter((n) => n.id !== selectedNode));
    setEdges((eds) =>
      eds.filter((e) => e.source !== selectedNode && e.target !== selectedNode)
    );
    setSelectedNode(null);
    toast.success("Node deleted");
  }, [selectedNode, setNodes, setEdges]);

  const exportJSON = useCallback(() => {
    const data = {
      nodes: nodes.map(({ id, type, position, data: { label, isRoot } }) => ({
        id,
        type,
        position,
        data: { label, isRoot },
      })),
      edges,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mindmap.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Mind map exported");
  }, [nodes, edges]);

  const importJSON = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileImport = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          if (data.nodes) {
            setNodes(updateNodesWithEditHandler(data.nodes));
            setEdges(data.edges || []);
            toast.success("Mind map imported");
          }
        } catch (err) {
          toast.error("Invalid JSON file");
        }
      };
      reader.readAsText(file);
      event.target.value = "";
    },
    [setNodes, setEdges, updateNodesWithEditHandler]
  );

  const saveLocal = useCallback(() => {
    const data = {
      nodes: nodes.map(({ id, type, position, data: { label, isRoot } }) => ({
        id,
        type,
        position,
        data: { label, isRoot },
      })),
      edges,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    toast.success("Saved to local storage");
  }, [nodes, edges]);

  const loadLocal = useCallback(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const { nodes: savedNodes, edges: savedEdges } = JSON.parse(savedData);
        setNodes(updateNodesWithEditHandler(savedNodes));
        setEdges(savedEdges || []);
        toast.success("Loaded from local storage");
      } catch (e) {
        toast.error("Failed to load saved data");
      }
    } else {
      toast.error("No saved data found");
    }
  }, [setNodes, setEdges, updateNodesWithEditHandler]);

  const clearAll = useCallback(() => {
    setNodes(
      updateNodesWithEditHandler([
        {
          id: "root",
          type: "mindmap",
          position: { x: 400, y: 300 },
          data: { label: "Central Idea", isRoot: true },
        },
      ])
    );
    setEdges([]);
    setSelectedNode(null);
    localStorage.removeItem(STORAGE_KEY);
    toast.success("Mind map cleared");
  }, [setNodes, setEdges, updateNodesWithEditHandler]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case "n":
            e.preventDefault();
            addNode();
            break;
          case "s":
            e.preventDefault();
            saveLocal();
            break;
          case "o":
            e.preventDefault();
            loadLocal();
            break;
        }
      }

      if (e.key === "Delete" && selectedNode) {
        deleteNode();
      }

      if (e.key === "Enter" && selectedNode && !e.ctrlKey) {
        // Trigger edit mode - handled by node component
      }

      if (e.ctrlKey && e.key === "Enter" && selectedNode) {
        addNode(selectedNode);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [addNode, saveLocal, loadLocal, deleteNode, selectedNode]);

  return (
    <div className="h-screen w-full flex flex-col bg-background">
      <Header />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          onAddNode={() => addNode()}
          onAddChild={() => selectedNode && addNode(selectedNode)}
          onDeleteNode={deleteNode}
          onExportJSON={exportJSON}
          onImportJSON={importJSON}
          onSaveLocal={saveLocal}
          onLoadLocal={loadLocal}
          onClearAll={clearAll}
          hasSelectedNode={!!selectedNode && selectedNode !== "root"}
        />

        <div ref={reactFlowWrapper} className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onNodeContextMenu={(e, node) => onContextMenu(e, node)}
            onPaneContextMenu={(e) => onContextMenu(e)}
            onInit={setReactFlowInstance}
            nodeTypes={nodeTypes}
            fitView
            minZoom={0.1}
            maxZoom={2}
            defaultEdgeOptions={{
              type: "smoothstep",
              animated: true,
              style: { stroke: "hsl(120 100% 50%)", strokeWidth: 2 },
            }}
          >
            <Controls className="!bottom-4 !left-4" />
            <Background
              variant={BackgroundVariant.Dots}
              gap={30}
              size={1}
              color="hsl(120 100% 50% / 0.15)"
            />
          </ReactFlow>

          {contextMenu && (
            <ContextMenu
              x={contextMenu.x}
              y={contextMenu.y}
              nodeId={contextMenu.nodeId}
              onClose={() => setContextMenu(null)}
              onAddNode={() => addNode()}
              onAddChild={() => contextMenu.nodeId && addNode(contextMenu.nodeId)}
              onDeleteNode={deleteNode}
              onEditNode={() => {
                // Edit is handled by double-click
                toast.info("Double-click node to edit");
              }}
            />
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileImport}
        className="hidden"
      />
    </div>
  );
};

export default MindMapCanvas;
