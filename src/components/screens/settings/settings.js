import React from 'react';
// import { tokenMap } from '../../../constants/tokens';
import Box from '../../toolbox/box';
import CheckBox from '../../toolbox/checkBox';
// import LanguageSelect from './languageSelect';
import Piwik from '../../../utils/piwik';
import SecondPassphraseSetting from './secondPassphrase';
// import Select from '../../toolbox/select';
import accountConfig from '../../../constants/account';
// import links from '../../../constants/externalLinks';
// import settingsConst from '../../../constants/settings';
import styles from './settings.css';
import txTypes from '../../../constants/transactionTypes';

class Settings extends React.Component {
  constructor() {
    super();
    // this.state = {
    //  currencies: settingsConst.currencies,
    // };

    this.setCurrency = this.setCurrency.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.toggleAutoLog = this.toggleAutoLog.bind(this);
    this.handleTokenToggle = this.handleTokenToggle.bind(this);
  }

  handleTokenToggle({ target: { name } }) {
    const { settings } = this.props;
    const newSettings = {
      token: { list: { [name]: !settings.token.list[name] } },
    };
    this.onUpdateSettings(newSettings);
  }

  toggleAutoLog({ target }) {
    Piwik.trackingEvent('Settings', 'button', 'Toggle autoLog');
    const {
      account, accountUpdated,
    } = this.props;
    if (target && account.passphrase) {
      const date = Date.now() + accountConfig.lockDuration;
      accountUpdated({ expireTime: date });
    }
    this.handleCheckboxChange({ target });
  }

  setCurrency(currency) {
    const { settings } = this.props;
    if (settings.currency !== currency.value) this.onUpdateSettings({ currency: currency.value });
  }

  handleCheckboxChange({ target: { name } }) {
    const { settings } = this.props;
    this.onUpdateSettings({ [name]: !settings[name] });
  }

  onUpdateSettings(newSettings) {
    const { settingsUpdated, toastDisplayed, t } = this.props;
    Piwik.trackingEvent('Settings', 'button', 'Update settings');
    settingsUpdated(newSettings);
    toastDisplayed({ label: t('Settings saved!') });
  }

  render() {
    const {
      t, settings,
      hasSecondPassphrase,
      isAuthenticated,
      transactions: { pending },
      account,
    } = this.props;
    // const { currencies } = this.state;

    const isHardwareWalletAccount = account.hwInfo && account.hwInfo.deviceId;
    const isHwWalletClass = isHardwareWalletAccount ? `${styles.disabled} disabled` : '';
    // const activeCurrency = currencies.indexOf(settings.currency || settingsConst.currencies[0]);
    const hasPendingSecondPassphrase = pending.find(element =>
      element.type === txTypes.setSecondPassphrase) !== undefined;

    return (
      <div className={styles.settingsHolder}>
        <Box className={styles.wrapper} width="medium">
          <Box.Header>
            <h1>{t('Settings')}</h1>
          </Box.Header>
          <Box.Content className={styles.content}>
            {/*
            <section>
              <h2>{t('Locale')}</h2>
              <div className={styles.fieldGroup}>
                <span className={styles.labelName}>{t('Currency')}</span>
                <Select
                  options={currencies.map(currency => ({
                    label: currency, value: currency,
                  }))}
                  selected={activeCurrency}
                  onChange={this.setCurrency}
                  className="currency"
                />
              </div>
              <LanguageSelect t={t} />
            </section>
            */}
            <section>
              <h2>{t('Security')}</h2>
              <label className={`${styles.fieldGroup} ${styles.checkboxField}`}>
                <CheckBox
                  name="autoLog"
                  className={`${styles.checkbox} autoLog`}
                  checked={settings.autoLog}
                  onChange={this.toggleAutoLog}
                />
                <div>
                  <span className={styles.labelName}>{t('Auto Logout')}</span>
                  <p>{t('Log out automatically after 10 minutes.')}</p>
                </div>
              </label>
              {isAuthenticated // && settings.token.active !== tokenMap.BTC.key
                ? (
                  <SecondPassphraseSetting
                    {...{
                      account, hasSecondPassphrase, isHwWalletClass, t, hasPendingSecondPassphrase,
                    }}
                  />
                )
                : null}

              <label className={`${styles.fieldGroup} ${styles.checkboxField}`}>
                <CheckBox
                  name="discreetMode"
                  className={`${styles.checkbox} discreetMode`}
                  checked={settings.discreetMode}
                  onChange={this.handleCheckboxChange}
                />
                <div>
                  <span className={styles.labelName}>{t('Discreet Mode')}</span>
                  <p>{t('Hide balance and transactions amounts')}</p>
                </div>
              </label>

            </section>
            <section>
              <h2>{t('Advanced')}</h2>
              <label className={`${styles.fieldGroup} ${styles.checkboxField}`}>
                <CheckBox
                  name="showNetwork"
                  className={`${styles.checkbox} showNetwork`}
                  checked={settings.showNetwork}
                  onChange={this.handleCheckboxChange}
                />
                <div>
                  <span className={styles.labelName}>{t('Network switcher')}</span>
                  <p>{t('Enable a network switcher that lets you select testnet or custom node when logging in.')}</p>
                </div>
              </label>
              {/*
                !isHardwareWalletAccount
                  ? (
                    <label className={`${styles.fieldGroup} ${styles.checkboxField} enableBTC`}>
                      <CheckBox
                        name="BTC"
                        className={`${styles.checkbox}`}
                        checked={!!(settings.token && settings.token.list.BTC)}
                        onChange={this.handleTokenToggle}
                      />
                      <div>
                        <span className={styles.labelName}>{t('Enable BTC')}</span>
   <p>{t('By enabling it, you will be able to manage your BTC inside the application.')}</p>
                      </div>
                    </label>
                  )
                  : null
            </section>
            <section>
              <h2>{t('Privacy')}</h2>
              <label className={`${styles.fieldGroup} ${styles.checkboxField}`}>
                <CheckBox
                  name="statistics"
                  className={`${styles.checkbox} statistics`}
                  checked={settings.statistics}
                  onChange={this.handleCheckboxChange}
                />
                <div>
                  <span className={styles.labelName}>
                    {t('Anonymous analytics collection')}
                  </span>
                  <a target="_blank" href={links.privacyPolicy} className={styles.link}>
                    {t('Privacy Policy')}
                  </a>
                </div>
              </label>
              */}
            </section>
          </Box.Content>
        </Box>
      </div>
    );
  }
}

export default Settings;
