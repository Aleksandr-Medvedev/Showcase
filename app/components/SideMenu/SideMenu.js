import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MenuItem from 'app/components/MenuItem/MenuItem';
import { Items } from 'app/containers/NavigationDrawer/NavigationDrawer';
import SideMenuStyles from './SideMenuStyles';

function SideMenu(props) {
  const onItemClicked = props.onItemClicked;
  return (
    <ScrollView style={SideMenuStyles.menu}>
      <MenuItem
        title="Receipts"
        icon={require('app/images/home.png')}
        onPress={() => onItemClicked(Items.EXPENSES)}
        style={SideMenuStyles.item}
      />
      <MenuItem
        title="Reports"
        icon={require('app/images/reports.png')}
        onPress={() => onItemClicked(Items.REPORTS)}
        style={SideMenuStyles.item}
      />
      <MenuItem
        title="Inbox"
        icon={require('app/images/inbox.png')}
        onPress={() => onItemClicked(Items.INBOX)}
        style={SideMenuStyles.item}
      />
      <MenuItem
        title={props.connectEmailPayload ? 'Email Settings' : 'Connect Email'}
        icon={require('app/images/exchange.png')}
        onPress={() => onItemClicked(Items.CONNECT_EMAIL)}
        style={SideMenuStyles.item}
      />
      <MenuItem
        title="Invite a Friend"
        icon={require('app/images/invite.png')}
        onPress={() => onItemClicked(Items.INVITE_FRIEND)}
        style={SideMenuStyles.item}
      />
      <MenuItem
        title="Support Chat"
        icon={require('app/images/feedback.png')}
        onPress={() => onItemClicked(Items.SUPPORT_CHAT)}
        style={SideMenuStyles.item}
      />
      <MenuItem
        title="FAQ's"
        icon={require('app/images/speech-bubble.png')}
        onPress={() => onItemClicked(Items.FAQ)}
        style={SideMenuStyles.item}
      />
      <MenuItem
        title="Settings"
        icon={require('app/images/settings.png')}
        onPress={() => onItemClicked(Items.SETTINGS)}
        style={SideMenuStyles.item}
      />
      <MenuItem
        title="Change Plan"
        icon={require('app/images/upgrade.png')}
        onPress={() => onItemClicked(Items.UPGRADE)}
        style={SideMenuStyles.item}
      />
    </ScrollView>
  );
}

SideMenu.propTypes = {
  onItemClicked: PropTypes.func.isRequired,
  connectEmailPayload: PropTypes.object,
};

function mapStateToProps(state) {
  const { connectEmail } = state;
  return {
    connectEmailPayload: connectEmail.payload,
  };
}

export default connect(mapStateToProps)(SideMenu);
