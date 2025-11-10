import React, { useEffect } from 'react';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {
  Defs,
  FeBlend,
  FeFlood,
  FeGaussianBlur,
  Filter,
  LinearGradient,
  Path,
  RadialGradient,
  Rect,
  Stop,
} from 'react-native-svg';
import CdIcon from '../CdIcon';

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedPath = Animated.createAnimatedComponent(Path);

interface SpectrumBarProps {
  x: number;
  baseHeight: number;
  maxHeight: number;
  baseY: number;
}

const SpectrumBar: React.FC<SpectrumBarProps> = ({
  x,
  baseHeight,
  maxHeight,
  baseY,
}) => {
  const height = useSharedValue(baseHeight);

  const animatedProps = useAnimatedProps(() => {
    return {
      height: height.value,
      y: baseY - height.value / 2,
    };
  });

  useEffect(() => {
    const animate = () => {
      height.value = withTiming(
        Math.random() * maxHeight + 4,
        {
          duration: 200 + Math.random() * 100,
          easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        },
        () => runOnJS(animate)()
      );
    };
    animate();
  }, []);

  return (
    <AnimatedRect
      x={x}
      width={3.66413}
      rx={1.83207}
      fill="white"
      animatedProps={animatedProps}
    />
  );
};

interface WaveGlowProps {
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  gradientId: string;
  filterId: string;
  baseAmplitude: number;
  maxAmplitude: number;
  frequency: number;
  speed: number;
  color: string;
}

const WaveGlow: React.FC<WaveGlowProps> = ({
  width,
  height,
  centerX,
  centerY,
  gradientId,
  filterId,
  baseAmplitude,
  maxAmplitude,
  frequency,
  speed,
}) => {
  const amplitude = useSharedValue(baseAmplitude);
  const phase = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    const radius = Math.min(width, height) / 2;
    const points: string[] = [];

    for (let angle = 0; angle <= 2 * Math.PI; angle += 0.02) {
      const waveOffset =
        Math.sin(angle * frequency + phase.value) * amplitude.value;
      const currentRadius = radius + waveOffset;

      const x = centerX + Math.cos(angle) * currentRadius;
      const y = centerY + Math.sin(angle) * currentRadius;

      if (points.length === 0) {
        points.push(`M ${x} ${y}`);
      } else {
        const prevAngle = angle - 0.02;
        const prevWaveOffset =
          Math.sin(prevAngle * frequency + phase.value) * amplitude.value;
        const prevRadius = radius + prevWaveOffset;
        const prevX = centerX + Math.cos(prevAngle) * prevRadius;
        const prevY = centerY + Math.sin(prevAngle) * prevRadius;

        const controlX =
          (prevX + x) / 2 + Math.cos(angle - 0.01) * (waveOffset * 0.1);
        const controlY =
          (prevY + y) / 2 + Math.sin(angle - 0.01) * (waveOffset * 0.1);

        points.push(`Q ${controlX} ${controlY} ${x} ${y}`);
      }
    }

    points.push('Z');

    return { d: points.join(' ') };
  });

  useEffect(() => {
    amplitude.value = withRepeat(
      withTiming(maxAmplitude, {
        duration: 800 + Math.random() * 200,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      }),
      -1,
      true
    );

    phase.value = withRepeat(
      withTiming(2 * Math.PI, {
        duration: speed * 800,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, []);

  return (
    <AnimatedPath
      animatedProps={animatedProps}
      fill={`url(#${gradientId})`}
      filter={`url(#${filterId})`}
    />
  );
};

interface SpectrumIconProps {
  size?: number;
  animated?: boolean;
}

export const SpectrumIcon: React.FC<SpectrumIconProps> = ({
  size = 176,
  animated = false,
}) => {
  const centerX = 83.2319;
  const centerY = 78.4582;

  return (
    <CdIcon size={size} viewBox="0 0 176 171">
      <Defs>
        <Filter
          id="filter0_f_2212_79743"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          filterUnits="objectBoundingBox"
        >
          <FeFlood floodOpacity="0" result="BackgroundImageFix" />
          <FeBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <FeGaussianBlur
            stdDeviation="6.42834"
            result="effect1_foregroundBlur_2212_79743"
          />
        </Filter>
        <Filter
          id="filter1_f_2212_79743"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          filterUnits="objectBoundingBox"
        >
          <FeFlood floodOpacity="0" result="BackgroundImageFix" />
          <FeBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <FeGaussianBlur
            stdDeviation="9.14269"
            result="effect1_foregroundBlur_2212_79743"
          />
        </Filter>
        <Filter
          id="filter2_f_2212_79743"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          filterUnits="objectBoundingBox"
        >
          <FeFlood floodOpacity="0" result="BackgroundImageFix" />
          <FeBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <FeGaussianBlur
            stdDeviation="6.42834"
            result="effect1_foregroundBlur_2212_79743"
          />
        </Filter>
        <Filter
          id="filter3_f_2212_79743"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          filterUnits="objectBoundingBox"
        >
          <FeFlood floodOpacity="0" result="BackgroundImageFix" />
          <FeBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <FeGaussianBlur
            stdDeviation="8.76918"
            result="effect1_foregroundBlur_2212_79743"
          />
        </Filter>

        <LinearGradient
          id="paint0_linear_2212_79743"
          x1="53.1933"
          y1="43.4491"
          x2="93.0427"
          y2="96.3667"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FF00F5" />
          <Stop offset="1" stopColor="#6C5FFE" stopOpacity="0" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_2212_79743"
          x1="46.4643"
          y1="30.6569"
          x2="103.14"
          y2="105.919"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#13B5D2" />
          <Stop offset="1" stopColor="#6C5FFE" stopOpacity="0" />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_2212_79743"
          x1="94.3856"
          y1="68.4078"
          x2="94.3856"
          y2="128.433"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFF500" stopOpacity="0.58" />
          <Stop offset="1" stopColor="#9CFFED" stopOpacity="0" />
        </LinearGradient>
        <LinearGradient
          id="paint3_linear_2212_79743"
          x1="78.4552"
          y1="70.3488"
          x2="149.32"
          y2="110.802"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#30D5C8" />
          <Stop offset="1" stopColor="#9CFFED" stopOpacity="0" />
        </LinearGradient>

        <LinearGradient
          id="paint0_animated_2212_79743"
          x1="53.1933"
          y1="43.4491"
          x2="93.0427"
          y2="96.3667"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FF00F5" stopOpacity="0.3" />
          <Stop offset="1" stopColor="#6C5FFE" stopOpacity="0" />
        </LinearGradient>
        <LinearGradient
          id="paint1_animated_2212_79743"
          x1="46.4643"
          y1="30.6569"
          x2="103.14"
          y2="105.919"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#13B5D2" stopOpacity="0.3" />
          <Stop offset="1" stopColor="#6C5FFE" stopOpacity="0" />
        </LinearGradient>
        <LinearGradient
          id="paint2_animated_2212_79743"
          x1="94.3856"
          y1="68.4078"
          x2="94.3856"
          y2="128.433"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFF500" stopOpacity="0.25" />
          <Stop offset="1" stopColor="#9CFFED" stopOpacity="0" />
        </LinearGradient>
        <LinearGradient
          id="paint3_animated_2212_79743"
          x1="78.4552"
          y1="70.3488"
          x2="149.32"
          y2="110.802"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#30D5C8" stopOpacity="0.3" />
          <Stop offset="1" stopColor="#9CFFED" stopOpacity="0" />
        </LinearGradient>
        <RadialGradient
          id="paint4_radial_2212_79743"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(83.2319 78.4582) rotate(90) scale(51.5578 51.3198)"
        >
          <Stop offset="0.7" stopColor="white" stopOpacity="0" />
          <Stop offset="1" stopColor="white" />
        </RadialGradient>
      </Defs>

      <Path
        d="M117.904 67.8441C117.904 83.5909 91.3807 105.36 75.7066 105.36C60.0326 105.36 33.8828 93.9077 33.8828 78.1609C33.8828 62.4142 55.9248 34.8301 71.5989 34.8301C87.273 34.8301 117.904 52.0973 117.904 67.8441Z"
        fill="url(#paint0_linear_2212_79743)"
        filter="url(#filter0_f_2212_79743)"
      />
      <Path
        d="M138.499 65.3525C138.499 87.7484 100.776 118.709 78.4839 118.709C56.1914 118.709 19 102.422 19 80.0257C19 57.6298 50.3492 18.3984 72.6417 18.3984C94.9341 18.3984 138.499 42.9567 138.499 65.3525Z"
        fill="url(#paint1_linear_2212_79743)"
        filter="url(#filter1_f_2212_79743)"
      />
      <Path
        d="M137.516 88.1037C137.516 104.679 107.524 126.37 91.0248 126.37C74.5257 126.37 48.0807 121.374 48.0807 104.798C48.0807 88.2227 45.025 62.4053 61.524 62.4053C78.023 62.4053 137.516 71.5281 137.516 88.1037Z"
        fill="url(#paint2_linear_2212_79743)"
        filter="url(#filter2_f_2212_79743)"
      />
      <Path
        d="M130.925 32.4395C150.45 43.6885 155.644 94.0653 144.447 113.68C133.25 133.295 109.419 161.343 89.8944 150.094C70.3702 138.845 37.8864 124.957 49.0834 105.342C60.2804 85.7276 111.401 21.1905 130.925 32.4395Z"
        fill="url(#paint3_linear_2212_79743)"
        filter="url(#filter3_f_2212_79743)"
      />

      {animated && (
        <>
          <WaveGlow
            width={140}
            height={140}
            centerX={centerX}
            centerY={centerY}
            gradientId="paint1_animated_2212_79743"
            filterId="filter1_f_2212_79743"
            baseAmplitude={2}
            maxAmplitude={4}
            frequency={2}
            speed={3}
            color="#13B5D2"
          />

          <WaveGlow
            width={120}
            height={120}
            centerX={centerX}
            centerY={centerY}
            gradientId="paint0_animated_2212_79743"
            filterId="filter0_f_2212_79743"
            baseAmplitude={1.5}
            maxAmplitude={3.5}
            frequency={3}
            speed={2.5}
            color="#FF00F5"
          />

          <WaveGlow
            width={100}
            height={100}
            centerX={centerX}
            centerY={centerY}
            gradientId="paint2_animated_2212_79743"
            filterId="filter2_f_2212_79743"
            baseAmplitude={1}
            maxAmplitude={3}
            frequency={4}
            speed={2}
            color="#FFF500"
          />

          <WaveGlow
            width={110}
            height={110}
            centerX={centerX}
            centerY={centerY}
            gradientId="paint3_animated_2212_79743"
            filterId="filter3_f_2212_79743"
            baseAmplitude={1.5}
            maxAmplitude={3.5}
            frequency={5}
            speed={2.2}
            color="#30D5C8"
          />
        </>
      )}

      {animated ? (
        <>
          <SpectrumBar
            x={41.6035}
            baseHeight={7.32826}
            maxHeight={20}
            baseY={79.4093}
          />
          <SpectrumBar
            x={50.7637}
            baseHeight={21.9848}
            maxHeight={35}
            baseY={79.0661}
          />
          <SpectrumBar
            x={59.9238}
            baseHeight={5.4962}
            maxHeight={18}
            baseY={79.5773}
          />
          <SpectrumBar
            x={69.084}
            baseHeight={29.313}
            maxHeight={45}
            baseY={79.0813}
          />
          <SpectrumBar
            x={78.2441}
            baseHeight={14.6565}
            maxHeight={30}
            baseY={79.2376}
          />
          <SpectrumBar
            x={87.4043}
            baseHeight={9.16033}
            maxHeight={25}
            baseY={79.4415}
          />
          <SpectrumBar
            x={96.5664}
            baseHeight={16.4886}
            maxHeight={32}
            baseY={79.2812}
          />
          <SpectrumBar
            x={105.727}
            baseHeight={5.4962}
            maxHeight={18}
            baseY={79.5773}
          />
          <SpectrumBar
            x={114.887}
            baseHeight={21.9848}
            maxHeight={35}
            baseY={79.0661}
          />
        </>
      ) : (
        <>
          <Rect
            x="41.6035"
            y="75.417"
            width="3.66413"
            height="7.32826"
            rx="1.83207"
            fill="white"
          />
          <Rect
            x="50.7637"
            y="68.0889"
            width="3.66413"
            height="21.9848"
            rx="1.83207"
            fill="white"
          />
          <Rect
            x="59.9238"
            y="76.333"
            width="3.66413"
            height="5.4962"
            rx="1.83207"
            fill="white"
          />
          <Rect
            x="69.084"
            y="64.4248"
            width="3.66413"
            height="29.313"
            rx="1.83207"
            fill="white"
          />
          <Rect
            x="78.2441"
            y="71.7529"
            width="3.66413"
            height="14.6565"
            rx="1.83207"
            fill="white"
          />
          <Rect
            x="87.4043"
            y="74.501"
            width="3.66413"
            height="9.16033"
            rx="1.83207"
            fill="white"
          />
          <Rect
            x="96.5664"
            y="70.8369"
            width="3.66413"
            height="16.4886"
            rx="1.83207"
            fill="white"
          />
          <Rect
            x="105.727"
            y="76.333"
            width="3.66413"
            height="5.4962"
            rx="1.83207"
            fill="white"
          />
          <Rect
            x="114.887"
            y="68.0889"
            width="3.66413"
            height="21.9848"
            rx="1.83207"
            fill="white"
          />
        </>
      )}

      <Path
        d="M83.2314 27.8916C111.023 27.8916 133.56 50.5268 133.561 78.458C133.561 106.389 111.023 129.024 83.2314 129.024C55.4404 129.024 32.9033 106.389 32.9033 78.458C32.9034 50.5269 55.4405 27.8918 83.2314 27.8916Z"
        fill="url(#paint4_radial_2212_79743)"
        stroke="white"
        strokeWidth="1.98299"
      />
    </CdIcon>
  );
};

export default SpectrumIcon;

