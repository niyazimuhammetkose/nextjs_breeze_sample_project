import Image from 'next/image'
import SocialLogoPaths from '@/components/SocialLogo/SocialLogoPaths.json'

const SocialLogo = ({ logoName }) => {
    const logoSrc = SocialLogoPaths[logoName] || SocialLogoPaths['default']

    return (
        <Image src={logoSrc} alt={`${logoName} Logo`} width={24} height={24} />
    )
}

export default SocialLogo
