
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type IconName =
  React.ComponentProps<typeof Ionicons>["name"];

const TABS: {
  name: string;
  title: string;
  icon: IconName;
}[] = [
  {
    name: "index",
    title: "Home",
    icon: "home",
  },
  {
    name: "signup",
    title: "Sign Up",
    icon: "person-add",
  },
];

export default function TabLayout() {
  return (
    <Tabs>
      {TABS.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name={icon}
                color={typeof color === "string" ? color : "black"}
                size={size}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
