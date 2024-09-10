import EditProfileForm from "./components/EditProfile";

const availablePreferences = [
    'Computer Science',
    'Medicine',
    'Politic',
    'Nature',
    'Animal',
    'Tips',
    'Photography',
    'Car',
  ];
  

const EditProfile = () => {
    return (
        <>
            <EditProfileForm
            initialUsername="johndoe"
            initialNama="John Doe"
            initialBio="A passionate developer who loves building amazing apps."
            availablePreferences={availablePreferences}
            />
        </>
    )
}

export default EditProfile