import { Page } from 'puppeteer';
import { Route } from '@/typings';

declare const page: Page;

const RouterConfig = require('../../config/config').default.routes;
const BASE_URL = `http://localhost:${process.env.PORT || 8000}`;

function formatter(data: Route[]) {
  return data
    .reduce((pre: string[], item: Route) => {
      if (item.routes) {
        pre.push(item.routes[0].path);
      } else {
        pre.push(item.path);
      }
      return pre;
    }, [])
    .filter((item: string) => item);
}

describe('Homepage', () => {
  const testPage = (path: string) => async () => {
    await page.goto(`${BASE_URL}${path}`);
    await page.waitForSelector('footer', {
      timeout: 2000,
    });
    const haveFooter = await page.evaluate(
      () => document.getElementsByTagName('footer').length > 0,
    );
    expect(haveFooter).toBeTruthy();
  };

  beforeAll(async () => {
    jest.setTimeout(1000000);
    await page.setCacheEnabled(false);
  });
  const routers = formatter(RouterConfig[1].routes);
  routers.forEach(route => {
    it(`test pages ${route}`, testPage(route));
  });
});
