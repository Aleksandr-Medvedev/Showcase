/**
 * Created by Aleksandr_Medvedev on 7/18/17.
 */

import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';

import getMixedStyle from 'app/utils/getMixedStyle';
import Colors from 'app/styles/Colors';
import GeneralStyles from 'app/styles/GeneralStyles';
import SegmentControlStyle from './SegmentControlStyle';

class SegmentControl extends React.Component {
  // ========================================== //
  // Redner
  // ========================================== //

  render() {
    const style = getMixedStyle(this.props.style, GeneralStyles.containerHorizontallyCentered);
    return <View style={style}>
      {this.props.items.map((item, index) => {
        let textStyle = [GeneralStyles.textBodyTwo, SegmentControlStyle.text];
        let touchableStyle = SegmentControlStyle.item;
        if (index === 0) {
          touchableStyle = getMixedStyle(SegmentControlStyle.itemLeft, touchableStyle);
        } else if (index === (this.props.items.length - 1)) {
          touchableStyle = getMixedStyle(SegmentControlStyle.itemRight, touchableStyle);
        }

        if (this.props.selectedItemIndex === index) {
          textStyle = getMixedStyle(SegmentControlStyle.textSelected, textStyle);
          touchableStyle = getMixedStyle(SegmentControlStyle.itemSelected, touchableStyle);
        } else {
          textStyle = getMixedStyle(SegmentControlStyle.textDefault, textStyle);
          touchableStyle = getMixedStyle(SegmentControlStyle.itemDefault, touchableStyle);
        }

        return (
          <TouchableHighlight
            key={item}
            underlayColor={Colors.lightGrayHighlight}
            onPress={() => this.props.onItemPress(item, index)}
            style={touchableStyle}
          >
            <Text style={textStyle}>
              {item.toString()}
            </Text>
          </TouchableHighlight>
        );
      })}
    </View>;
  }
}

SegmentControl.propTypes = {
  style: View.propTypes.style,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onItemPress: PropTypes.func,
  selectedItemIndex: PropTypes.number,
};

export default SegmentControl;
