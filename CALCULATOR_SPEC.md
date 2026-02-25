# Calculator HTML Structure Specification

## Overview
This document describes the HTML structure for a basic calculator application with semantic markup and accessibility features.

## File Structure
- `index.html` - Main HTML structure
- `styles.css` - CSS styling (to be implemented)
- `calculator.js` - JavaScript functionality (to be implemented)

## HTML Structure

### Main Container
- `<main class="calculator-container">` - Semantic main element wrapping the calculator
- `<div class="calculator">` - Primary calculator wrapper with ARIA role="application"

### Display Area
- `<div class="calculator__display">` - Display container
- `<div id="display" class="display__screen">` - Actual display screen
  - Includes `aria-live="polite"` for screen reader announcements
  - Includes `aria-atomic="true"` to announce entire value on change
  - Default value: "0"

### Button Grid
All buttons are contained within `<div class="calculator__buttons">`

#### Button Categories

**Clear Button:**
- ID: `btn-clear`
- Classes: `btn`, `btn--clear`
- Purpose: Reset calculator to initial state

**Number Buttons (0-9):**
- IDs: `btn-0` through `btn-9`
- Classes: `btn`, `btn--number`
- Data attribute: `data-number="<value>"`
- Special: `btn-0` also has `btn--zero` class for potential wider styling

**Operator Buttons:**
- Division: `btn-divide` (/)
- Multiplication: `btn-multiply` (×)
- Subtraction: `btn-subtract` (−)
- Addition: `btn-add` (+)
- Classes: `btn`, `btn--operator`
- Data attribute: `data-operator="<symbol>"`
- Special: `btn-add` includes `btn--operator-tall` for potential 2-row spanning

**Equals Button:**
- ID: `btn-equals`
- Classes: `btn`, `btn--equals`, `btn--equals-tall`
- Purpose: Calculate and display result
- Includes tall variant class for potential 2-row spanning

**Decimal Button:**
- ID: `btn-decimal`
- Classes: `btn`, `btn--decimal`
- Data attribute: `data-decimal="."`
- Purpose: Add decimal point to numbers

## CSS Targeting Strategy

### BEM Naming Convention
The structure uses BEM (Block Element Modifier) methodology:
- Block: `calculator`
- Elements: `calculator__display`, `calculator__buttons`, `display__screen`
- Modifiers: `btn--number`, `btn--operator`, `btn--clear`, etc.

### Selection Methods

**For JavaScript:**
1. By ID: Direct targeting of specific buttons (e.g., `document.getElementById('btn-clear')`)
2. By data attributes: `document.querySelectorAll('[data-number]')` for all number buttons
3. By class: `document.querySelectorAll('.btn--operator')` for all operators

**For CSS:**
1. Component-level: `.calculator`, `.calculator__display`
2. Button types: `.btn--number`, `.btn--operator`, `.btn--clear`
3. Specific buttons: `#btn-equals`, `#btn-0`
4. State modifiers: Can add `.btn--active`, `.btn--disabled` as needed

## Accessibility Features

1. **Semantic HTML**: Uses `<main>`, `<button>` elements
2. **ARIA Labels**: Each button has descriptive `aria-label`
3. **ARIA Live Region**: Display announces changes to screen readers
4. **Application Role**: Calculator marked as `role="application"`
5. **Keyboard Accessible**: All buttons are native `<button>` elements

## Grid Layout Recommendation

The button layout is designed for a 4-column grid:

```
Row 1: [C  ] [/] [*] [-]
Row 2: [7] [8] [9] [+]
Row 3: [4] [5] [6] [+]
Row 4: [1] [2] [3] [=]
Row 5: [0    ] [.] [=]
```

Where:
- `+` button spans rows 2-3 (tall)
- `=` button spans rows 4-5 (tall)
- `0` button spans 2 columns (wide)

This can be achieved with CSS Grid:
```css
.calculator__buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
}
```

## Data Attributes

Data attributes provide semantic meaning for JavaScript event handling:

- `data-number`: Contains the numeric value (0-9)
- `data-operator`: Contains the operator symbol (+, -, *, /)
- `data-decimal`: Contains the decimal point character

This allows clean event delegation:
```javascript
// Example usage
document.querySelector('.calculator__buttons').addEventListener('click', (e) => {
    if (e.target.dataset.number) {
        handleNumber(e.target.dataset.number);
    } else if (e.target.dataset.operator) {
        handleOperator(e.target.dataset.operator);
    }
});
```

## Future Enhancements

Potential additions to consider:
1. Backspace/Delete button
2. Percentage button
3. Plus/minus toggle
4. Memory functions (MC, MR, M+, M-)
5. Scientific calculator mode
6. History/tape display
7. Keyboard input support documentation

## Testing Checklist

- [ ] All buttons have unique IDs
- [ ] Display updates are announced to screen readers
- [ ] Buttons are keyboard accessible (Tab, Enter/Space)
- [ ] High contrast mode compatibility
- [ ] Touch target sizes (minimum 44x44px recommended)
- [ ] Focus indicators visible
