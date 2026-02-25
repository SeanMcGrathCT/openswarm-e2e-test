# Calculator HTML Structure Specification

## Overview
This document describes the HTML structure for a basic calculator interface designed with semantic HTML, accessibility, and maintainability in mind.

## File Structure
- **index.html** - Main HTML structure
- **styles.css** - CSS styling (to be implemented)
- **script.js** - JavaScript functionality (to be implemented)

## HTML Architecture

### Container Structure
```
<main class="calculator-container">
  └── <div class="calculator">
      ├── <div class="calculator__display-wrapper">
      │   └── <output id="calculator-display">
      └── <div class="calculator__buttons">
          └── Multiple <button> elements
```

### Semantic HTML Choices

#### 1. **`<main>` Element**
- Wraps the entire calculator as the primary content
- Improves accessibility and document structure

#### 2. **`<output>` Element for Display**
- Semantically correct for displaying calculation results
- Includes `aria-live="polite"` for screen reader announcements
- `aria-atomic="true"` ensures entire display is read on change

#### 3. **`role="application"`**
- Applied to calculator container
- Signals to assistive technologies this is an interactive application
- Includes descriptive `aria-label="Calculator"`

## Class Naming Convention

### BEM Methodology (Block Element Modifier)
- **Block**: `calculator`
- **Elements**: `calculator__display`, `calculator__buttons`, `calculator__button`
- **Modifiers**: `calculator__button--number`, `calculator__button--operator`, etc.

### Class Categories

#### Base Classes
- `calculator` - Main calculator block
- `calculator__display-wrapper` - Display container
- `calculator__display` - Display output element
- `calculator__buttons` - Button grid container
- `calculator__button` - Base button class

#### Modifier Classes
- `calculator__button--number` - Number buttons (0-9)
- `calculator__button--operator` - Operator buttons (+, -, ×, /)
- `calculator__button--clear` - Clear button
- `calculator__button--equals` - Equals button
- `calculator__button--decimal` - Decimal point button
- `calculator__button--wide` - Wide button (for 0)
- `calculator__button--tall` - Tall button (for + and =)

## ID Naming Convention

All buttons have descriptive IDs for JavaScript targeting:
- **Number buttons**: `btn-0` through `btn-9`
- **Operator buttons**: `btn-add`, `btn-subtract`, `btn-multiply`, `btn-divide`
- **Function buttons**: `btn-clear`, `btn-equals`, `btn-decimal`
- **Display**: `calculator-display`

## Data Attributes

### `data-number` (Number Buttons)
- Values: "0" through "9"
- Purpose: Easy querying and value extraction in JavaScript
- Example: `data-number="7"`

### `data-operator` (Operator Buttons)
- Values: "+", "-", "*", "/"
- Purpose: Identify operator type for calculation logic
- Example: `data-operator="+"`

## Accessibility Features

### ARIA Attributes
1. **`aria-label`** on all buttons
   - Provides clear descriptions for screen readers
   - Examples: "Seven", "Add", "Clear"

2. **`aria-live="polite"`** on display
   - Announces changes to screen readers
   - Non-intrusive announcements

3. **`aria-atomic="true"`** on display
   - Ensures entire display value is read, not just changes

4. **`role="application"`** on calculator
   - Indicates interactive application context

### Semantic Button Text
- Uses proper symbols: `×` for multiply, `−` for subtract
- Clear, readable labels

## Layout Design

### Button Grid Structure
The calculator uses a 4-column grid layout:

```
Row 1: [ C  ] [ /  ] [ ×  ] [ -  ]
Row 2: [ 7  ] [ 8  ] [ 9  ] [ +  ] (+ spans 2 rows)
Row 3: [ 4  ] [ 5  ] [ 6  ] [    ]
Row 4: [ 1  ] [ 2  ] [ 3  ] [ =  ] (= spans 2 rows)
Row 5: [ 0  (wide)  ] [ .  ] [    ]
```

### Special Layout Classes
- **`calculator__button--wide`**: Spans 2 columns (0 button)
- **`calculator__button--tall`**: Spans 2 rows (+ and = buttons)

## JavaScript Integration Points

### Querying Elements
```javascript
// All number buttons
document.querySelectorAll('[data-number]')

// All operator buttons
document.querySelectorAll('[data-operator]')

// Specific buttons
document.getElementById('btn-clear')
document.getElementById('btn-equals')
document.getElementById('calculator-display')
```

### Event Handling Patterns
```javascript
// Number buttons
document.querySelectorAll('.calculator__button--number')
  .forEach(btn => btn.addEventListener('click', handleNumber))

// Operator buttons
document.querySelectorAll('.calculator__button--operator')
  .forEach(btn => btn.addEventListener('click', handleOperator))

// Clear button
document.getElementById('btn-clear')
  .addEventListener('click', handleClear)

// Equals button
document.getElementById('btn-equals')
  .addEventListener('click', handleEquals)
```

## CSS Styling Hooks

### Grid Layout (recommended CSS)
```css
.calculator__buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
}

.calculator__button--wide {
  grid-column: span 2;
}

.calculator__button--tall {
  grid-row: span 2;
}
```

### Visual Differentiation
- Use `calculator__button--number` for number button styling
- Use `calculator__button--operator` for operator button styling
- Use `calculator__button--clear` for clear button emphasis
- Use `calculator__button--equals` for equals button emphasis

## Browser Compatibility
- Semantic HTML5 elements (`<main>`, `<output>`)
- ARIA attributes (WCAG 2.1 compliant)
- Modern CSS Grid support recommended
- Works with modern browsers (Chrome, Firefox, Safari, Edge)

## Future Enhancements (Not in Scope)
- Decimal point functionality
- Keyboard input support
- Memory functions (M+, M-, MR, MC)
- Percentage calculations
- Delete/backspace functionality
- Scientific calculator mode

## Validation
- Valid HTML5
- Accessible (WCAG 2.1 AA compliant)
- No inline styles
- Separation of concerns (HTML/CSS/JS)
