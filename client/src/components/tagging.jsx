import React, { useState } from 'react';
import './tag.css'; // Import the CSS file

const LabelContainer = ({ onSelectTag }) => {
  const [labels, setLabels] = useState([]);
  const [newLabel, setNewLabel] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [tagColors, setTagColors] = useState([]);

  // Define an array of colors
  const colorPalette = [
    "#ffcccc", "#ccffcc", "#ccccff", "#ffffcc", "#ffccff",
    "#ccffff", "#ffd8a8", "#d8a8ff", "#a8ffd8", "#d8d8ff",
    // Add more colors as needed
  ];

  const handleAddLabel = () => {
    if (newLabel.trim() !== '') {
      const capitalizedLabel = newLabel.trim().toUpperCase(); // Capitalize the label
      setLabels([...labels, capitalizedLabel]);
      setNewLabel('');
  
      // Assign a color from the color palette to the new label
      const colorIndex = labels.length % colorPalette.length;
      const newTagColors = [...tagColors];
      newTagColors.push(colorPalette[colorIndex]);
      setTagColors(newTagColors);
    }
  
  };

  const handleSelectTag = (tag, color) => {
    onSelectTag(tag, color);
  };

  const handleDeleteLabel = (index) => {
    const updatedLabels = [...labels];
    updatedLabels.splice(index, 1);
    setLabels(updatedLabels);

    const updatedTagColors = [...tagColors];
    updatedTagColors.splice(index, 1);
    setTagColors(updatedTagColors);

    if (editMode && index === editIndex) {
      setEditMode(false);
      setEditIndex(null);
      setNewLabel('');
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setNewLabel('');
  };

  const handleEditButtonClick = () => {
    if (!editMode) {
      setEditMode(true);
      setNewLabel('');
    }
  };

  const handleLabelChange = (e, index) => {
    const updatedLabels = [...labels];
    updatedLabels[index] = e.target.value;
    setLabels(updatedLabels);
  };

  console.log(tagColors)

  return (
    <div className="container">
      <div className="label-input">
        <input
          type="text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
        />
        {editMode ? null : (
          <button className="add-btn" onClick={handleAddLabel}>Add Label</button>
        )}
        <button className="edit-btn" onClick={editMode ? handleCancel : handleEditButtonClick}>
          {editMode ? 'Cancel' : 'Edit Label'}
        </button>
      </div>
      <div>
        {labels.map((label, index) => (
          <div key={index} onClick={() => handleSelectTag(label, tagColors[index])} className="label" >
            <input
              type="text"
              value={label}
              onChange={(e) => handleLabelChange(e, index)}
              readOnly={!editMode}
            />
            {editMode && (
              <span className="delete-icon" onClick={() => handleDeleteLabel(index)}>
                &#10060;
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabelContainer;
