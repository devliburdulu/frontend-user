import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAuthContext } from 'src/auth/hooks';
import { useTheme } from '@mui/material/styles';
import {
  getListBank,
  getBankAccount,
  deleteBankAccount,
  createBankAccount,
} from 'src/fetch-global';
import { useSnackbar } from 'src/components/snackbar';
import Iconify from 'src/components/iconify';

export default function ProfileBank() {
  const { user } = useAuthContext();
  const [banks, setBanks] = useState([]);
  const [bankOptions, setBankOptions] = useState([]);
  const [loadingBanks, setLoadingBanks] = useState(true);
  const [loadingBankOptions, setLoadingBankOptions] = useState(true);
  const [loading, setLoading] = useState(false); // New loading state for adding a bank
  const [open, setOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountOwner, setAccountOwner] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { enqueueSnackbar } = useSnackbar();

  const fetchListBank = async () => {
    try {
      setLoadingBankOptions(true);
      const response = await getListBank();
      setBankOptions(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingBankOptions(false);
    }
  };

  const fetchBankAccount = async () => {
    try {
      setLoadingBanks(true);
      const response = await getBankAccount(user.id);
      setBanks(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingBanks(false);
    }
  };

  const handleAddClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddBank = async () => {
    const newBankAccount = {
      seller_id: user.id,
      bank_name: selectedBank,
      account_name: accountOwner,
      account_number: accountNumber,
    };

    setLoading(true);

    try {
      const response = await createBankAccount(newBankAccount);

      if (response) {
        await fetchBankAccount();
        handleClose();
        enqueueSnackbar('Rekening berhasil ditambahkan!', {
          variant: 'success',
        });
      }
    } catch (error) {
      console.error('Failed to add bank account:', error);
      enqueueSnackbar(error.message || 'Rekening gagal ditambahkan.', {
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBankAccount(id);
      setBanks((prevBanks) => prevBanks.filter((bank) => bank.id !== id));
      enqueueSnackbar('Rekening berhasil dihapus!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Rekening gagal dihapus!', { variant: 'success' });
      console.error('Failed to delete bank account:', error);
    }
  };

  useEffect(() => {
    fetchListBank();
    fetchBankAccount();
  }, []);

  const renderDialog = (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
      <DialogTitle sx={{ fontWeight: 600 }}>
        Mau tambah rekening apa?
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          {loadingBankOptions ? (
            <CircularProgress size={24} />
          ) : (
            <TextField
              select
              label='Nama Bank'
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              fullWidth>
              {bankOptions &&
                Array.isArray(bankOptions) &&
                bankOptions.map((option) => (
                  <MenuItem key={option.code} value={option.code}>
                    {option.name}
                  </MenuItem>
                ))}
            </TextField>
          )}
          <TextField
            label='Nomor Rekening'
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            fullWidth
            type='number'
          />
          <TextField
            label='Nama Pemilik Rekening'
            value={accountOwner}
            onChange={(e) => setAccountOwner(e.target.value)}
            helperText='*Nama harus sesuai dengan nomor rekening'
            fullWidth
          />
          <Typography variant='caption' color='text.secondary'>
            Dengan klik tombol di bawah, kamu menyetujui{' '}
            <a href='#'>Syarat & Ketentuan</a> serta{' '}
            <a href='#'>Kebijakan Privasi</a> untuk menambahkan rekening.
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ fontWeight: 600 }}>
          Batal
        </Button>
        <Button
          onClick={handleAddBank}
          variant='contained'
          disabled={loading}
          sx={{
            fontWeight: 600,
            backgroundColor: '#1D9CAB',
            color: '#FFF',
            '&:hover': {
              backgroundColor: '#128391',
            },
            '&.Mui-disabled': {
              backgroundColor: '#cccccc',
              color: '#666666',
            },
          }}>
          {loading ? 'Menambahkan...' : 'Tambah Rekening'}
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <>
      <Stack component={Card} spacing={3} sx={{ p: { xs: 2, sm: 3 } }}>
        <Stack
          direction={isMobile ? 'column' : 'row'}
          justifyContent='space-between'
          alignItems={isMobile ? 'flex-start' : 'center'}
          spacing={isMobile ? 2 : 0}>
          <Stack
            direction={'column'}
            justifyContent={'left'}
            alignItems={'start'}>
            <Typography variant='h6' fontWeight={600}>
              Simpan maksimal 3 rekening Bank
            </Typography>
            <Typography variant='caption'>
              Saldo Liburdulu kamu bisa ditarik ke rekening ini.
            </Typography>
          </Stack>
          <Button
            onClick={handleAddClick}
            variant='outlined'
            startIcon={<span>+</span>}
            sx={{
              alignSelf: isMobile ? 'flex-start' : 'center',
              fontWeight: 600,
            }}
            disabled={banks.length >= 3}>
            Tambah Rekening
          </Button>
        </Stack>
        {banks.length >= 3 && (
          <Typography variant='caption' color='error'>
            *Rekening Bank sudah mencapai batas maksimum.
          </Typography>
        )}
        <Divider />
        {loadingBanks ? (
          <CircularProgress />
        ) : banks && Array.isArray(banks) && banks.length > 0 ? (
          banks.map((bank) => (
            <Box key={bank.id}>
              <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                spacing={2}
                sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
                <Stack
                  direction='row'
                  spacing={2}
                  alignItems='center'
                  sx={{ width: { xs: '100%', sm: 'auto' } }}>
                  {/* <img src="/path/to/bca-logo.png" alt={`${bank.bank_name} Logo`} style={{ width: 40, height: 40 }} /> */}
                  <Iconify
                    icon='majesticons:creditcard-line'
                    style={{ color: `#1D9CAB` }}
                    width={35}
                  />
                  <Stack>
                    <Typography
                      variant='body1'
                      sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>
                      {bank.bank_name}
                    </Typography>
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      {bank.account_number} - {bank.account_name}
                    </Typography>
                  </Stack>
                </Stack>
                <Button
                  variant='outlined'
                  color='error'
                  onClick={() => handleDelete(bank.id)}
                  sx={{
                    alignSelf: { xs: 'flex-end', sm: 'center' },
                    mt: { xs: 1, sm: 0 },
                    fontWeight: 600,
                  }}>
                  Hapus
                </Button>
              </Stack>
              <Divider sx={{ my: 2 }} />
            </Box>
          ))
        ) : (
          <Typography>No banks found</Typography>
        )}
      </Stack>
      {renderDialog}
    </>
  );
}
