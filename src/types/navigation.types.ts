import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type MainTabParamList = {
  Explore: undefined;
  Cart: undefined;
  Favourite: undefined;
  Account: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Auth: undefined;
  Login: undefined;
  Register: undefined;
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  ProductDetail: {
    productId: string;
  };
  Search: {
    categoryId?: number;
    directSearch?: boolean;
  };
  Checkout: undefined;
  OrderAccepted: undefined;
  OrderFailed: undefined;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>; 