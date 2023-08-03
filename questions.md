In React, a regular component (React.Component) re-renders whenever its state or props change. In contrast, a React.PureComponent optimizes rendering by performing a shallow comparison of new and old props and state. If they have the same references, re-rendering is avoided. This boosts performance but requires caution with complex data to avoid potential bugs.

class MyComponent extends React.PureComponent {
  render() {
    return <div>{this.props.data.name}</div>;
  }
}

// somewhere else in your code
const data = { name: 'John Doe' };
<MyComponent data={data} />

// and then later
data.name = 'Jane Doe'; // mutate data object directly
<MyComponent data={data} /> // MyComponent will NOT re-render, as data object reference hasn't changed, despite the name property having changed

2. When a component that consumes context data implements shouldComponentUpdate, it may prevent re-renders even if the context data has changed. This is because shouldComponentUpdate only checks for changes in props and state, but context changes are not included in these checks.

3. Callbacks: Components can communicate with their parent by passing callback functions as props, allowing the child to invoke the function and send information back to the parent.

Context: React's Context API enables components to share data with their parent (or other components) without needing to pass props explicitly, creating a shared data store accessible by all components within a specific context.

State management libraries: Utilize state management libraries like Redux or MobX to manage shared data and update the parent component accordingly.

4. React.memo: Wrap the component with React.memo to memoize its result and prevent unnecessary re-renders when its props or state haven't changed.

ShouldComponentUpdate: For class components, you can implement the shouldComponentUpdate lifecycle method and manually check if the component should update based on the changes in its props or state. Return false to prevent re-rendering in certain cases. Note that with the advent of React hooks, you can use React.memo in functional components instead of shouldComponentUpdate in most cases.

5. React fragment provides a clean and efficient way to return multiple elements from a component without the need for extra, unnecessary wrapper DOM elements.

6. Authentication HOC: A higher-order component that wraps another component and checks the user's authentication status. If the user is authenticated, it renders the wrapped component; otherwise, it might redirect the user to a login page or show a restricted access message.

Logging HOC: A higher-order component that logs certain events or data when a component renders or certain actions are triggered within the wrapped component. It can be used to gather analytics or debug information without modifying the original component.

Styling HOC: A higher-order component that adds specific styles or CSS classes to the wrapped component. This can be useful when you have common styling needs across multiple components and want to encapsulate that styling logic in a separate HOC for reusability.

7. setState takes two arguments: the updated state object or function, and an optional callback function. setState is asynchronous for performance optimization.

8. Remove Lifecycle Methods: In a function component, there are no lifecycle methods like componentDidMount, componentDidUpdate, etc. You need to convert the logic inside these methods to React Hooks or handle it differently using other methods.

Remove this References: In function components, you don't use this to access props or state. Instead, you directly use the prop or state variable.

Convert State to useState Hook: If your class component uses state, you'll need to replace it with the useState hook to manage the component's state.

Replace Class Component with Function Component: Create a new function component and paste the logic from the class component into the function component.

Convert Event Handlers: If you have event handlers defined as class methods, update them to regular functions and handle them with React Hooks like useState, useEffect, or useCallback.

Update Render Method: In function components, you don't have a render method. The return value of the function will be the component's JSX to be rendered.

Remove Constructor: Remove the constructor from your class component since you don't need it in function components.

Refactor Lifecycle Hooks: Convert any other lifecycle hooks you might be using (e.g., componentWillUnmount, getDerivedStateFromProps, etc.) to equivalent React Hooks or functional logic.

Migrate Context and Refs: If your class component uses Context API or Refs, you'll need to update them using their respective hooks (useContext and useRef).

9. Inline styles, styled components, style modules, css classes, ui libraries...
10. At first we need to check if it includes some scripts, if html looks safe, then we can use dangerouslySetInnerHTML attribute to inject this html to dom element. 