import type { ModelViewerElementBase } from '@google/model-viewer';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<ModelViewerElementBase> & {
          src?: string;
          alt?: string;
          'auto-rotate'?: boolean;
          'rotation-per-second'?: string;
          'camera-controls'?: boolean;
          'camera-orbit'?: string;
          'min-camera-orbit'?: string;
          'max-camera-orbit'?: string;
          'shadow-intensity'?: string;
          'shadow-softness'?: string;
          'environment-image'?: string;
          exposure?: string | number;
          className?: string;
          onLoad?: () => void;
          onError?: () => void;
        },
        typeof HTMLElement
      >;
    }
  }
}