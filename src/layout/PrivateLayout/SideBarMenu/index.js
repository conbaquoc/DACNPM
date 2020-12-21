import React, { Component } from "react";
import { Menu, Icon } from "antd";
import _ , { findLast } from "lodash";

import { history } from "../../../redux/store";

const sidebarMenu = [
  {
    key: "property",
    text: "Quản lý Post",
    url: "/post",
    icon: "project",
  },
  {
    key: "option",
    text: "Quản lý Place",
    url: "/options",
    icon: "setting",
  },
  
];

// Flatten sidebar menu
const sidebarMenuFlatten = _.map(
  _.flatMap(sidebarMenu, item => {
    if (item.subMenu) {
      return _.map(item.subMenu, subMenuItem => ({
        ...subMenuItem,
        parent: item.key, // gán parent của submenu
      }));
    }
    return item;
  }))

export default class SideBarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // current : "dashboard",
      defaultSelectedKeys: findLast(
        sidebarMenuFlatten,
        (menu) => window.location.pathname.indexOf(menu.url) === 0,
      ) || { key: "dashboard" },

    };
  }


  render() {
    return (
      <Menu
        mode="inline"
        defaultSelectedKeys={this.state.defaultSelectedKeys.key}
        defaultOpenKeys={
          this.state.defaultSelectedKeys.parent === "transactions"
            ? ["transactions"]
            : []
        }
        location={this.props.children}
        className="sidebarMenu"
      >
        <Menu.Item key="dashboard" onClick={() => history.push("/")}>
          <span>
            <Icon type="dashboard" />
            <span>Quản Lý User</span>
          </span>
        </Menu.Item>
        {sidebarMenu.map((el) => {
          if (el.subMenu && el.subMenu.length > 0) {
            return (
              <Menu.SubMenu
                key={el.key}
                title={(
                  <span>
                    <Icon type="transaction" />
                    <span>{el.text}</span>
                  </span>
                )}
              >
                {el.subMenu.map((sube) => (
                  <Menu.Item
                    key={sube.key}
                    onClick={() => history.push(sube.url)}
                  >
                    <span>
                      <Icon type={sube.icon} />
                      <span>{sube.text}</span>
                    </span>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            );
          }
          return (
            <Menu.Item key={el.key} onClick={() => history.push(el.url)}>
              <span>
                <Icon type={el.icon} />
                <span>{el.text}</span>
              </span>
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }
}
