import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HomeScreen } from "../../screens/Home";
import { CollageScreen } from "../../screens/Collage";
import { SelfiesScreen } from "../../screens/Selfies";
import { FiltersScreen } from "../../screens/Filters";
import { TrashScreen } from "../../screens/Trash";
import { screens } from "../../utils";

const Tab = createBottomTabNavigator();

export function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarInactiveTintColor: "#646464",
        tabBarActiveTintColor: "#0891b2",
        tabBarIcon: ({ color, size }) => screenIcon(route, color, size),
      })}
    >
      <Tab.Screen name={screens.gallery.homeScreen} component={HomeScreen} options={{ title: "Inicio" }} />
      <Tab.Screen name={screens.gallery.collageScreen} component={CollageScreen} options={{ title: "Collage" }} />
      <Tab.Screen name={screens.gallery.selfiesScreen} component={SelfiesScreen} options={{ title: "Selfies" }} />
      <Tab.Screen name={screens.gallery.filtersScreen} component={FiltersScreen} options={{ title: "Filtros" }} />
      <Tab.Screen name={screens.gallery.trashScreen} component={TrashScreen} options={{ title: "Papelera" }} />
    </Tab.Navigator>
  );
}

function screenIcon(route, color, size) {
  let iconName;
  if (route.name === screens.gallery.homeScreen) iconName = "image-multiple";
  if (route.name === screens.gallery.collageScreen) iconName = "view-grid";
  if (route.name === screens.gallery.selfiesScreen) iconName = "camera";
  if (route.name === screens.gallery.filtersScreen) iconName = "filter";
  if (route.name === screens.gallery.trashScreen) iconName = "delete";

  return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
}