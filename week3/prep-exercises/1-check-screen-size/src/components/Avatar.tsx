import { useEffect, useState } from 'react';
import { BeanHead } from 'beanheads';
import { hats, hatColors, accessories, clothings, clothingColors, graphics, getRandom } from '../avatars/avatarData';
import { useWindowSize } from '../hooks/useWindowSize';

type RandomProps = Pick<
  React.ComponentProps<typeof BeanHead>,
  'hat' | 'hatColor' | 'accessory' | 'clothing' | 'clothingColor' | 'graphic'
>;

type AvatarProps = {
  baseProps: Partial<React.ComponentProps<typeof BeanHead>>;
};

export function Avatar({ baseProps }: AvatarProps) {
  const { width } = useWindowSize();

  const [randomProps, setRandomProps] = useState<RandomProps>({
    hat: getRandom(hats),
    hatColor: getRandom(hatColors),
    accessory: getRandom(accessories),
    clothing: getRandom(clothings),
    clothingColor: getRandom(clothingColors),
    graphic: getRandom(graphics),
  });

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setRandomProps({
        hat: getRandom(hats),
        hatColor: getRandom(hatColors),
        accessory: getRandom(accessories),
        clothing: getRandom(clothings),
        clothingColor: getRandom(clothingColors),
        graphic: getRandom(graphics),
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [width]);

  return <BeanHead {...baseProps} {...randomProps} />;
}
