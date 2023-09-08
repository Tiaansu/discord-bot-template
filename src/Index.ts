import { config } from 'dotenv';
config();

import { Client } from '@/Structures';

const client = new Client();

client.start();