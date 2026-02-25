# Calculator UI Design Specification

## Overview
This document specifies the design and structure of a web-based calculator application with a modern, iOS-inspired interface.

## File Structure
```
.
├── index.html          # Main HTML structure
├── styles.css          # CSS styling with Grid layout
├── calculator.js       # JavaScript placeholder (to be implemented)
└── DESIGN_SPEC.md     # This specification document
```

## HTML Structure

### Semantic Layout
The calculator uses semantic HTML5 with clear separation of concerns:

```
<body>
  └── .calculator (main container)
      ├── .display (output area)
      │   ├── .display-previous (shows previous operand & operator)
      │   └── .display-current (shows current input/result)
      └── .buttons (button grid)
          └── button elements (20 total)
```

### Button Types & Data Attributes

All buttons use `data-*` attributes for semantic event handling:

1. **Number Buttons** (`data-number`)
   - Digits: 0-9
   - Decimal point: .
   - Class: `btn-number`

2. **Operator Buttons** (`data-operator`)
   - Addition: +
   - Subtraction: − (using proper minus sign)
   - Multiplication: × (using multiplication sign)
   - Division: ÷ (using division sign)
   - Class: `btn-operator`

3. **Function Buttons** (`data-action`)
   - Clear All: AC (`data-action="clear"`)
   - Delete: DEL (`data-action="delete"`)
   - Equals: = (`data-action="equals"`)

### Grid Layout Specifications

#### Button Grid
- **Layout**: CSS Grid with 4 columns
- **Grid Template**: `repeat(4, 1fr)`
- **Gap**: 1px (visual separator)

#### Special Grid Positions
1. **Zero Button**: Spans 2 columns (`grid-column: span 2`)
2. **Equals Button**: Spans 2 rows (`grid-row: span 2`)

#### Button Order (4x5 grid + spanning elements)
```
Row 1: [AC ] [DEL] [ ÷ ] [ × ]
Row 2: [ 7 ] [ 8 ] [ 9 ] [ − ]
Row 3: [ 4 ] [ 5 ] [ 6 ] [ + ]
Row 4: [ 1 ] [ 2 ] [ 3 ] [ = ]
Row 5: [  0    ] [ . ] [   ]  (= continues)
```

## CSS Architecture

### Color Scheme
- **Background Gradient**: Purple gradient (#667eea → #764ba2)
- **Calculator Body**: Dark gray (#2d2d2d)
- **Display Background**: Near black (#1a1a1a)
- **Number Buttons**: Medium gray (#3d3d3d)
- **Operator/Equals**: Orange (#ff9500)
- **Function Buttons**: Light gray (#a6a6a6)
- **Text Colors**: White (#ffffff), Gray (#858585)

### Layout Approach
**Primary Method**: CSS Grid (for button layout)
**Secondary Method**: Flexbox (for display area vertical alignment)

### Responsive Breakpoints
- **Desktop/Tablet**: Max-width 400px, comfortable spacing
- **Mobile** (<480px): Full width, reduced padding and font sizes

### Typography
- **Font Family**: System fonts (-apple-system, Segoe UI, Roboto)
- **Display Current**: 2.5rem (2rem on mobile)
- **Display Previous**: 1.2rem
- **Buttons**: 1.5rem (1.3rem on mobile)

### Interactive States
1. **Hover**: Lighter background, slight scale down (98%)
2. **Active**: Further scale down (95%), brighter background
3. **Focus**: 2px outline for keyboard navigation

### Accessibility Features
- Semantic HTML structure
- Focus indicators for keyboard navigation
- `prefers-reduced-motion` support
- Sufficient color contrast
- Touch-friendly button sizes (25px padding)

## Implementation Notes

### JavaScript Interface (To Be Implemented)
The HTML provides these hooks for JavaScript:

```javascript
// Display elements
const previousOperand = document.getElementById('previous-operand');
const currentOperand = document.getElementById('current-operand');

// Button event delegation
document.querySelector('.buttons').addEventListener('click', (e) => {
    const button = e.target;
    
    if (button.dataset.number) {
        // Handle number input
    }
    
    if (button.dataset.operator) {
        // Handle operator
    }
    
    if (button.dataset.action === 'clear') {
        // Clear all
    }
    
    if (button.dataset.action === 'delete') {
        // Delete last character
    }
    
    if (button.dataset.action === 'equals') {
        // Calculate result
    }
});
```

### State Management Requirements
1. Track current operand
2. Track previous operand
3. Track selected operator
4. Handle edge cases (division by zero, decimal points, etc.)

### Future Enhancements
- Keyboard support (number keys, operators, Enter, Backspace, Escape)
- Calculation history
- Memory functions (M+, M-, MR, MC)
- Scientific mode
- Theme switching
- Sound effects

## Browser Compatibility
- Modern browsers supporting CSS Grid (2017+)
- Fallback grid support: IE 11 (with autoprefixer)
- Mobile browsers: iOS Safari 10+, Chrome Android 60+

## Performance Considerations
- Minimal CSS (no heavy frameworks)
- No external dependencies
- Fast initial load
- Efficient Grid layout (GPU accelerated)

## Testing Recommendations
1. **Visual Testing**
   - Test on various screen sizes (mobile, tablet, desktop)
   - Verify button grid alignment
   - Check display overflow handling

2. **Interaction Testing**
   - Button hover states
   - Touch targets (minimum 44px recommended)
   - Focus indicators for keyboard navigation

3. **Browser Testing**
   - Chrome, Firefox, Safari, Edge
   - iOS Safari, Chrome Android

## Design Rationale

### Why CSS Grid?
- **Precise Control**: Easier to manage button spanning (0 button, = button)
- **Maintainable**: Clear grid structure vs. complex Flexbox nesting
- **Responsive**: Grid adapts naturally to container size

### Why Data Attributes?
- **Semantic**: Clearer intent than relying on classes or text content
- **Flexible**: Easy to add new button types
- **Maintainable**: JavaScript can select by role, not appearance

### Why Dark Theme?
- **Modern Aesthetic**: Aligns with current design trends
- **Reduced Eye Strain**: Especially for calculator use
- **Professional**: Evokes high-end calculator devices

## Conclusion
This design provides a solid foundation for a modern, accessible calculator application. The structure is semantic, the layout is responsive, and the code is maintainable for future enhancements.
