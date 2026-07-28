// This file is part of midnightntwrk/example-carbon-credit.
// Copyright (C) Midnight Foundation
// SPDX-License-Identifier: Apache-2.0
// Licensed under the Apache License, Version 2.0 (the "License");
// You may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

/**
 * The props required by the {@link TextPromptDialog} component.
 */
export interface TextPromptDialogProps {
  /** The prompt to display to the user. */
  prompt: string;
  /** `true` to render the dialog opened; otherwise closed. */
  isOpen: boolean;
  /** A callback that will be called if the user cancels the dialog. */
  onCancel: () => void;
  /** A callback that will be called when the user submits their inputted data. */
  onSubmit: (text: string) => void;
}

/**
 * A simple modal dialog that prompts the user for a single piece of textual data.
 */
export const TextPromptDialog: React.FC<Readonly<TextPromptDialogProps>> = ({ prompt, isOpen, onCancel, onSubmit }) => {
  const [text, setText] = useState<string>('');

  return (
    <Dialog open={isOpen} onClose={onCancel} fullWidth maxWidth="sm">
      <DialogTitle sx={{ pb: 1, pt: 3, px: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            color: '#f8fafc',
          }}
          data-testid="textprompt-dialog-title"
        >
          {prompt}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ px: 3, py: 1 }}>
        <TextField
          id="text-prompt"
          variant="outlined"
          focused
          fullWidth
          size="medium"
          color="primary"
          autoComplete="off"
          placeholder="0200..."
          slotProps={{ htmlInput: { style: { color: '#f8fafc', fontFamily: "'Inter', sans-serif" } } }}
          onChange={(e) => {
            setText(e.target.value);
          }}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
          inputRef={(input) => input?.focus()}
          data-testid="textprompt-dialog-text-prompt"
          sx={{ mt: 1 }}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 1, gap: 1 }}>
        <Button variant="outlined" data-testid="textprompt-dialog-cancel-btn" onClick={onCancel} sx={{ px: 3 }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          data-testid="textprompt-dialog-ok-btn"
          disabled={!text.length}
          onClick={() => {
            onSubmit(text);
          }}
          type="submit"
          sx={{ px: 4 }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
