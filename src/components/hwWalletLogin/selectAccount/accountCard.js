import React from 'react';
import { PrimaryButtonV2, SecondaryButtonV2 } from '../../toolbox/buttons/button';
import AccountVisual from '../../accountVisual';
import LiskAmount from '../../liskAmount';
import svg from '../../../utils/svgIcons';
import { InputV2 } from '../../toolbox/inputsV2';
import styles from './selectAccount.css';

const AccountCard = ({
  account,
  accountOnEditMode,
  index,
  onChangeAccountTitle,
  onEditAccount,
  onSaveNameAccounts,
  onSelectAccount,
  t,
}) => (
  <div id={account.address} className={`${styles.account} hw-account`}>
    <header className={styles.header}>
      { accountOnEditMode === index ?
        <React.Fragment>
          <InputV2
            value={account.name}
            size='xs'
            onChange={input => onChangeAccountTitle(input.target.value, index)}
            className={'account-name'}
          />
          <PrimaryButtonV2 className={`${styles.saveBtn} save-account`} onClick={() => onSaveNameAccounts()}>{t('Save')}</PrimaryButtonV2>
        </React.Fragment> :
        <React.Fragment>
          <span className={styles.accountTitle}>{account.name}</span>
          <SecondaryButtonV2 className={`${styles.editBtn} edit-account`} onClick={() => onEditAccount(index)}>{t('Edit')}<img src={svg.icon_edit}/></SecondaryButtonV2>
        </React.Fragment>
      }
    </header>

    <div className={styles.content}>
      <AccountVisual
        address={account.address || ''}
        size={55}
      />
      <div className={`${styles.row} row-address`}>
        <p>{account.address}</p>
        <span>{t('Address')}</span>
      </div>
      <div className={`${styles.row} row-balance`}>
        <p><LiskAmount val={account.balance} /> {t(' LSK')}</p>
        <span>{t('Balance')}</span>
      </div>

      <PrimaryButtonV2 className={'select-account'} onClick={() => onSelectAccount(account, index)}>
        {t('Select this account')}
      </PrimaryButtonV2>
    </div>
  </div>
);

export default AccountCard;
