import React, { useState } from "react";

const OpenFolderIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M6 4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-.55-.45-1-1-1s-1 .45-1 1v8H6V6h10.5c.55 0 1-.45 1-1s-.45-1-1-1H6z" />
  </svg>
);

const ClosedFolderIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M20 6H10l-2-2H2v16h20V6z" />
  </svg>
);

const TreeNode = ({
  label,
  isOpen,
  children,
  onToggle,
  onCreate,
  onRename,
  onDelete,
}) => {
  const [isOpenLocal, setIsOpenLocal] = useState(isOpen);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(label);

  const handleToggle = () => {
    setIsOpenLocal(!isOpenLocal);
    onToggle && onToggle();
  };

  const handleCreateFolder = () => {
    onCreate && onCreate(newName);
    setIsEditing(false);
  };

  const handleRenameFolder = () => {
    onRename && onRename(newName);
    setIsEditing(false);
  };

  const handleDeleteFolder = () => {
    onDelete && onDelete();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (newName) {
        if (label === "New Folder") {
          handleCreateFolder();
        } else {
          handleRenameFolder();
        }
      } else {
        setNewName(label);
      }
    }
    if (event.key === "Escape") {
      setNewName(label);
      setIsEditing(false);
    }
  };

  return (
    <div>
      <div onClick={handleToggle}>
        {isOpenLocal ? <OpenFolderIcon /> : <ClosedFolderIcon />}
        {isEditing ? (
          <input
            type="text"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            onFocus={(event) => event.target.select()}
            onBlur={() => setNewName(label)}
          />
        ) : (
          <span onDoubleClick={() => setIsEditing(true)}>{label}</span>
        )}
      </div>
      {isOpenLocal && (
        <div>
          {children}
          {label !== "New Folder" && (
            <div>
              <button onClick={handleDeleteFolder}>Delete</button>
            </div>
          )}
        </div>
      )}
      {label === "New Folder" && (
        <div>
          <button onClick={handleCreateFolder}>Create Folder</button>
        </div>
      )}
    </div>
  );
};

export default TreeNode;
