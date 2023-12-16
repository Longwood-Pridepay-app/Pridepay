import { Tabs } from 'expo-router/tabs';
export default function AppLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="MyRaffles"
                options={{
                    href: "Teacher_Raffle_Page"
                }}
            />
        </Tabs>
    );
}
