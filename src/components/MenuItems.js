import { Menu } from "antd";
import React from "react";

// used by favorites.js.
// Group Items according to their types
function MenuItem({ items }) {
  return items.map((item) => (
    <Menu.Item key={item.id}>
      <a href={item.url} target="_blank" rel="noopener noreferrer">
        {`${item.broadcaster_name} - ${item.title}`}
      </a>
    </Menu.Item>
  ));
}

export default MenuItem;
