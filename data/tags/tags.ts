import { generateTagId } from '@/utils/id';
import { Tag } from './tags.types';

export const tags: Tag[] = [
  'agency-ms',
  'commission-ms',
  'docker-images',
  'feature-ms',
  'file-upload-ms',
  'influencer-ms',
  'instagram-integration-ms',
  'k8s',
  'kotlin-shared',
  'marketplace-ms',
  'notification-ms',
  'partnerize-adapter-ms',
  'payment-details-ms',
  'profile-ms',
  'programme-ms',
  'reporting-ms',
  'society-admin-ui',
  'society-app-ui',
  'watchman-ms',
  'society-keycloak-theme',
  'transaction-ms',
  'unity-deployment-manager',
]
  .sort()
  .map((label, index, arr) => ({
    id: generateTagId(),
    label,
    bgColor: `hsl(${(360 / arr.length) * index}, 100%, 20%)`,
  }));
