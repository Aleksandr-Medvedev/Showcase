/**
 * Created by Aleksandr_Medvedev on 6/22/17.
 */

import PropTypes from 'prop-types';
import {
  Alert,
  InteractionManager,
} from 'react-native';

import AbstractComponent from 'app/components/AbstractComponent/AbstractComponent';

class AuthenticationComponent extends AbstractComponent {

  // ========================================== //
  // Lifecycle
  // ========================================== //

  componentWillReceiveProps(nextProps) {
    if (!this.props || this.props !== nextProps) {
      if (
        (nextProps.error && nextProps.stayLoggedIn === this.props.stayLoggedIn) &&
        (nextProps.invokingKey === this.props.sceneKey)
      ) {
        const errorPayload = nextProps.errorPayload || nextProps.payload;
        const message = errorPayload ? errorPayload.message || errorPayload.toString() : 'An' +
          ' error occurred';

        //fixme workaround for ios build https://github.com/facebook/react-native/issues/10471
        InteractionManager.runAfterInteractions(() => setTimeout(
          () => Alert.alert('Warning!', message, [{ text: 'OK' }]),
          400,
        ));
        return;
      }

      if (nextProps.token && nextProps.user && !nextProps.loading) {

        if (!this.props || this.props.loading !== nextProps.loading ||
          this.props.user !== nextProps.user || nextProps.token !== this.props.token ||
          nextProps.stayLoggedIn === this.props.stayLoggedIn) {

          this.authenticationIsFinished(nextProps);
        }
      }
    }
  }

  // ========================================== //
  // Actions
  // ========================================== //

  authenticationIsFinished() {
    throw new Error('Abstract method!');
  }

}

AuthenticationComponent.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
};

export default AuthenticationComponent;

