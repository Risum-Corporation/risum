import * as React from "react";
import { Text, View } from "react-native";
import {
  Banner,
  Button,
  Provider as PaperProvider,
  DefaultTheme,
} from "react-native-paper";
import firebase from "../database/firebaseConnection";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

const BannerTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    accent: "#f1c40f",
  },
};
interface EmailProps {
  theme: boolean;
}

const EmailVerify = ({ theme }: EmailProps) => {
  const [visible, setVisible] = React.useState(true);

  async function handleSendEmail() {

  }

  return (
    <Banner
      visible={visible}
      actions={[]}
      style={{
        backgroundColor: theme ? colors.backgroundLight : colors.searchBarColor,
        marginBottom: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
      }}
      icon={() => (
        <>
          <Text
            style={{
              color: theme ? colors.whiteLight : colors.white,
              fontFamily: fonts.heading,
            }}
          >
            Parece que você ainda não verificou sua conta Risum
          </Text>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: 20,
            }}
          >
            <View style={{ marginRight: 20 }}>
              <Button
                icon="email"
                mode="contained"
                uppercase={false}
                style={{
                  backgroundColor: theme ? colors.purpleLight : colors.purple,
                  borderWidth: 1,
                }}
                labelStyle={{
                  color: theme ? colors.whiteLight : colors.white,
                  fontFamily: fonts.subtitle,
                }}
                onPress={() => handleSendEmail()}
              >
                Reenviar
              </Button>
            </View>
            <Button
              mode="outlined"
              uppercase={false}
              style={{
                borderColor: theme ? colors.whiteLight : colors.white,
                borderWidth: 1,
              }}
              labelStyle={{
                color: theme ? colors.whiteLight : colors.white,
                fontFamily: fonts.subtitle,
              }}
              onPress={() => setVisible(false)}
            >
              Depois
            </Button>
          </View>
        </>
      )}
    >
      .
    </Banner>
  );
};

export default EmailVerify;
