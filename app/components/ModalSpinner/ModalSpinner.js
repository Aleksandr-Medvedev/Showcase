/**
 * Created by Aleksandr_Medvedev on 7/4/17.
 */

import React from 'react';
import { Modal } from 'react-native';

import Spinner from 'app/components/Spinner/Spinner';
import ModalSpinnerStyles from './ModalSpinnerStyles';

class ModalSpinner extends React.Component {

  // ========================================== //
  // Render
  // ========================================== //

  render() {
    const props = this.props.navigationState || this.props;
    return <Modal
      animationType={'none'}
      transparent={true}
      {...props}
    >
      <Spinner
        style={ModalSpinnerStyles.containerLoading}
      />
    </Modal>;
  }
}

ModalSpinner.propTypes = {
  ...Modal.propTypes,
};

export default ModalSpinner;
