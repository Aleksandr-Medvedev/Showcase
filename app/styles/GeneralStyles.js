import {
  StyleSheet,
  Platform,
} from 'react-native';

import Colors from 'app/styles/Colors';

export default StyleSheet.create({

  // ========================================== //
  // Container styles
  // ========================================== //

  container: {
    flex: 1,
  },
  containerBackgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  containerVerticallyCentered: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10,
  },
  containerHorizontallyCentered: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // ========================================== //
  // Text Styles
  // ========================================== //

  textBodyOne: {
    ...Platform.select({
      ios: {
        fontSize: 17,
      },
      android: {
        fontSize: 14,
      },
    }),
    fontWeight: '400',
    backgroundColor: Colors.transparent,
  },
  textBodyTwo: {
    ...Platform.select({
      ios: { // Callout properties are applied here
        fontSize: 16,
        fontWeight: '400',
      },
      android: {
        fontSize: 14,
        fontWeight: '500',
      },
    }),
    backgroundColor: Colors.transparent,
  },
  textCaption: {
    fontSize: 12,
    fontWeight: '400',
  },
  textSubheading: Platform.select({
    ios: { // Headline properties are applied here
      fontSize: 17,
      fontWeight: '500',
    },
    android: {
      fontSize: 16,
      fontWeight: '400',
    },
  }),
  textTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  textHeadline: {
    fontSize: 24,
    fontWeight: '400',
  },
  textInput: Platform.select({
    ios: {
      height: 40,
      padding: 6,
    },
    android: {
      padding: 6,
    },
  }),

  // ========================================== //
  // Navigation Bar
  // ========================================== //

  navigationBar: {
    backgroundColor: Colors.darkBlue,
  },
  navigationBarTitle: {
    color: Colors.materialTextPrimaryInverse,
  },
  navigationBarButtonTextStyle: {
    color: Colors.materialTextPrimaryInverse,
  },
  navigationBarIconStyle: {
    tintColor: Colors.materialTextPrimaryInverse,
  },

  // hack to help KeyboardAvoidingView adjust views
  navigationBarKeyboardAvoidAnchor: {
    height: Platform.OS === 'ios' ? 64 : 54,
  },

  // ========================================== //
  // Swipe to delete
  // ========================================== //

  rowBack: {
    backgroundColor: '#ccc',
    flex: 1,
  },
  rowDelBtn: {
    alignItems: 'center',
    backgroundColor: '#f40938',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
    width: 90,
  },
  rowDelText: {
    color: '#fff',
    fontSize: 16,
  },

  // ========================================== //
  // Footer
  // ========================================== //

  containerFooter: {
    backgroundColor: Colors.darkBlue,
    height: 48,
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  touchableFooter: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

});
