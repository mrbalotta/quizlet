import React from "react";
import { HeaderInfo } from "@infra/navigation/api/data/HeaderInfo";

export class ScreenInfo {
  constructor(
    private route: string,
    private component: React.ComponentType<{}> | React.ComponentType<any>,
    private header: HeaderInfo | null = null,
    private groupName = "default"
  ) {}

  getComponent() {
    return this.component;
  }

  getRoute(): string {
    return this.route;
  }

  getTitle() {
    return this.header?.title ?? "";
  }

  getGroupName() {
    return this.groupName;
  }

  isHeaderShown() {
    return this.header != null;
  }
}
