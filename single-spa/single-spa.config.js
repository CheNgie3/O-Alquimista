import { registerApplication, start } from 'single-spa';

registerApplication(
  // 注册的应用的名称
  'header',
  // 加载函数
  () => import('./src/header/header.app'),
  // 活动函数
  location => true
)

registerApplication(
  'home',
  () => import('./src/content/content.app'),
    location => location.pathname === '' ||
    location.pathname === '/' ||
    location.pathname.startsWith('/home')
);


registerApplication(
  'footer',
  () => import('./src/footer/footer.app'),
  location => true
);


start();