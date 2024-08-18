import { Box, Typography } from '@mui/material';

export default function Home() {
  return (
    <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 75px)',
          py: 4,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          What is ZK-ABE System?
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 600, textAlign: 'center' }}>
          ZK-ABE is a decentralised access control system that allows for fine-grained access control over data.

          It includes functionality for encryption, secret key generation, and decryption.
        </Typography>
      </Box>
  );
}
