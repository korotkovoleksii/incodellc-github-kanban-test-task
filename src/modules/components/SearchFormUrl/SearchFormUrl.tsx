import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useState } from 'react';

const SearchFormUrl = (): JSX.Element => {
  const [url, setUrl] = useState('');
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', mt: '15px', mb: '15px' }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          mb: '15px',
          justifyContent: 'space-between',
        }}
      >
        <TextField
          variant="outlined"
          label="Enter repo URL"
          size="small"
          sx={{ width: '80%' }}
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <Button variant="contained" sx={{ width: 155 }} size="small">
          Load issues
        </Button>
      </Box>
      <Stack direction="row" spacing={2}>
        <Typography sx={{ color: '#4259CB' }}>FaceBook {'>'} React</Typography>
        <Stack direction="row">
          <StarIcon sx={{ color: '#E67700' }} />
          <Typography> 154K starts</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SearchFormUrl;
