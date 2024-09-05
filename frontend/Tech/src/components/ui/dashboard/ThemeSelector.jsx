import React from "react";
import useCustomTheme from '../../custom hooks/useCustomTheme';

function ThemeSelector() {
  const { currentTheme, changeTheme, themes } = useCustomTheme();

  return (
    <div className="p-4">
      <select 
        value={currentTheme} 
        onChange={(e) => changeTheme(e.target.value)}
        className="bg-primary text-background p-2 rounded"
      >
        {Object.keys(themes).map((theme) => (
          <option key={theme} value={theme}>
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ThemeSelector;