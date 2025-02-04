import i18n from 'i18next';
import process from './modules/process';

const addAboutMenuForMac = ({ template, name }) => {
  template.unshift({
    label: name,
    submenu: [
      {
        role: 'about',
        label: i18n.t('About'),
      },
      {
        role: 'quit',
        label: i18n.t('Quit'),
      },
    ],
  });
};

const addAboutMenuForNonMac = ({ template, electron }) => {
  // const copyright = `Copyright © 2016 - ${new Date().getFullYear()} Leasehold`;
  template[template.length - 1].submenu.push({
    label: i18n.t('About'),
    click(item, focusedWindow) {
      if (focusedWindow) {
        const options = {
          buttons: ['OK'],
          icon: `${__dirname}/assets/images/LSH.png`,
          message: `${i18n.t('Leasehold Hub')}\n${i18n.t('Version')} ${electron.app.getVersion()}`,
        };
        electron.dialog.showMessageBox(focusedWindow, options, () => {});
      }
    },
  });
};

/* const addCheckForUpdates = ({ template, checkForUpdates }) => {
  template[template.length - 1].submenu.push({
    label: i18n.t('Check for updates...'),
    click: checkForUpdates,
  });
}; */

const menu = {
  build: (electron) => {
    const template = menu.buildTemplate(electron);
    /* if (!process.isPlatform('linux')) {
      addCheckForUpdates({ template, checkForUpdates });
    } */
    if (process.isPlatform('darwin')) {
      addAboutMenuForMac({ template, name: electron.app.getName() });
    } else {
      addAboutMenuForNonMac({ template, electron });
    }
    return electron.Menu.buildFromTemplate(template);
  },
  onClickLink: (electron, url) => {
    electron.shell.openExternal(url);
  },
  buildTemplate: electron =>
    ([
      {
        label: i18n.t('Edit'),
        submenu: [
          {
            role: 'undo',
            label: i18n.t('Undo'),
          },
          {
            role: 'redo',
            label: i18n.t('Redo'),
          },
          {
            type: 'separator',
          },
          {
            role: 'cut',
            label: i18n.t('Cut'),
          },
          {
            role: 'copy',
            label: i18n.t('Copy'),
          },
          {
            role: 'paste',
            label: i18n.t('Paste'),
          },
          {
            role: 'selectall',
            label: i18n.t('Select all'),
          },
        ],
      },
      {
        label: i18n.t('View'),
        submenu: [
          {
            role: 'reload',
            label: i18n.t('Reload'),
          },
          {
            role: 'togglefullscreen',
            label: i18n.t('Toggle full screen'),
          },
        ],
      },
      {
        label: i18n.t('Window'),
        submenu: [
          {
            role: 'minimize',
            label: i18n.t('Minimize'),
          },
        ],
      },
      {
        label: i18n.t('Help'),
        submenu: [
          {
            label: i18n.t('Leasehold Website'),
            click: menu.onClickLink.bind(null, electron, 'https://leasehold.io'),
          },
          {
            label: i18n.t('Discord'),
            click: menu.onClickLink.bind(null, electron, 'https://discord.gg/8bJHhvU'),
          },
          {
            label: i18n.t('Leasehold Explorer'),
            click: menu.onClickLink.bind(null, electron, 'https://explorer.leasehold.io'),
          },
          {
            type: 'separator',
          },
        ],
      },
    ]),

};

export default menu;
