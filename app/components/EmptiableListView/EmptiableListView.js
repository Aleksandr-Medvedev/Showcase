/**
 * Created by Aleksandr_Medvedev on 8/16/17.
 */

import React from 'react';
import {
  ScrollView,
  ListView,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

import GeneralStyles from 'app/styles/GeneralStyles';
import EmptiableListViewStyles from './EmptiableListViewStyles';

class EmptiableListView extends React.Component {

  // ========================================== //
  // Actions
  // ========================================== //

  getScrollResponder() {
    return this.view.getScrollResponder();
  }

  // ========================================== //
  // Render
  // ========================================== //

  render() {
    if (this.props.dataSource && this.props.dataSource.getRowCount()) {
      return <ListView
        ref={view => this.view = view}
        {...this.props}
      />;
    } else {
      return <ScrollView
        ref={view => this.view = view}
        style={this.props.style}
        contentContainerStyle={EmptiableListViewStyles.containerEmptyList}
        refreshControl={this.props.refreshControl}
      >
        <Text style={[GeneralStyles.textBodyTwo, EmptiableListViewStyles.textEmptyTitle]}>
          {this.props.emptyTitle}
        </Text>
      </ScrollView>;
    }
  }
}

EmptiableListView.defaultProps = {
  ...ListView.defaultProps,
  emptyTitle: 'List is empty',
};

EmptiableListView.propTypes = {
  ...ListView.propTypes,
  emptyTitle: PropTypes.string,
};

export default EmptiableListView;
