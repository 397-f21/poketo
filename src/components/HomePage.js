import { SignInButton } from '../utilities/auth.js';
import {
    ColorSplash1,
    ColorSplash2,
    ColorSplash3,
    ColorSplash4,
    ColorSplash5,
    ColorBlender
} from '../styles/ColorSplash';
import{ TitleLayout,AppTitle} from '../styles/PageNavigator.js'

const HomePage = () => {

    return (
        <TitleLayout>
                <AppTitle>Pokéto</AppTitle >

                <ColorSplash5 id='splash5' />
                <ColorSplash4 id='splash4' />
                <ColorSplash3 id='splash3' />
                <ColorSplash2 id='splash2' />
                <ColorSplash1 id='splash1' />
                <ColorBlender id='color-blender' />

                <SignInButton />
                
            </TitleLayout>
    );
}

export default HomePage;