export interface Navigator {
  navigate(route: string, value?: any): void;
  goBack(): void;
}
