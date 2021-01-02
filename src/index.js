const Didact = {
  createElement(type, props, ...children) {
    return {
      type,
      props: {
        ...props,
        children: children.map((child) => {
          return typeof child === "object" ? child : this.createTextNode(child);
        }),
      },
    };
  },
  createTextNode(text) {
    return {
      type: "TEXT_ELEMENT",
      props: {
        nodeValue: text,
        children: [],
      },
    };
  },
  render(element, container) {
    const dom =
      element.type === "TEXT_ELEMENT"
        ? document.createTextNode("")
        : document.createElement(element.type);

    const isProp = (key) => key !== "children";

    Object.keys(element.props)
      .filter(isProp)
      .forEach((name) => (dom[name] = element.props[name]));

    element.props.children.forEach((child) => {
      this.render(child, dom);
    });

    container.appendChild(dom);
  },
};

/** @jsx Didact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);

const container = document.getElementById("root");
Didact.render(element, container);
