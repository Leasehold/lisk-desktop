import React from 'react';
import Passphrase from '../passphrase';
import Fees from '../../constants/fees';

const SecondPassphrase = ({
  account, peers, registerSecondPassphrase, closeDialog, t,
}) => {
  const onLoginSubmission = (secondPassphrase) => {
    registerSecondPassphrase({
      activePeer: peers.data,
      secondPassphrase,
      account,
    });
  };

  return (
    <Passphrase
      onPassGenerated={onLoginSubmission}
      keepModal={true}
      fee={Fees.setSecondPassphrase}
      closeDialog={closeDialog}
      confirmButton={t('Register')}
      useCaseNote={t('your second passphrase will be required for all transactions sent from this account')}
      securityNote={t('Losing access to this passphrase will mean no funds can be sent from this account.')}/>
  );
};

export default SecondPassphrase;
