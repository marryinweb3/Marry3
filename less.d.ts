/**
 * css/less module 模块声明
 */

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.less" {
  const classes: { [key: string]: string };
  export default classes;
}
declare module "*.json" {
  const classes: { [key: string]: string };
  export default classes;
}
