import { useState, useEffect, useRef } from 'react';
import { useKeyboard } from '@opentui/react';
import { ScrollBoxRenderable } from '@opentui/core';
import { theme } from '../theme';
import { Modal } from './Modal';

interface SettingsItem {
  id: string;
  label: string;
  description: string;
  execute: () => void;
}

interface SettingsModalProps {
  onEditConfig: () => void;
  onChangeTheme: () => void;
  onClose: () => void;
}

export function SettingsModal({ onEditConfig, onChangeTheme, onClose }: SettingsModalProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef<ScrollBoxRenderable>(null);

  const settingsItems: SettingsItem[] = [
    {
      id: 'edit-config',
      label: 'Edit Config',
      description: 'Open configuration file in editor',
      execute: onEditConfig,
    },
    {
      id: 'change-theme',
      label: 'Change Theme',
      description: 'Switch between available themes',
      execute: onChangeTheme,
    },
  ];

  // Auto-scroll to selected item when selection changes
  useEffect(() => {
    if (!scrollRef.current || settingsItems.length === 0) return;

    const itemHeight = 1;
    const scrollPosition = Math.max(0, selectedIndex * itemHeight - 2);
    scrollRef.current.scrollTo({ x: 0, y: scrollPosition });
  }, [selectedIndex, settingsItems.length]);

  useKeyboard((key) => {
    if (key.name === 'escape') {
      onClose();
    } else if (key.name === 'up') {
      setSelectedIndex((prev) => Math.max(0, prev - 1));
    } else if (key.name === 'down') {
      setSelectedIndex((prev) => Math.min(settingsItems.length - 1, prev + 1));
    } else if (key.name === 'return') {
      const item = settingsItems[selectedIndex];
      if (item) {
        item.execute();
        onClose();
      }
    }
  });

  return (
    <Modal width={60} height={16} title="Settings">
      <box flexDirection="column" flexGrow={1}>
        <scrollbox ref={scrollRef} width="100%" height={6} viewportCulling={true}>
          {settingsItems.map((item, index) => (
            <box key={item.id} flexDirection="row" height={1}>
              <text
                fg={index === selectedIndex ? theme.colors.git.modified : theme.colors.text.muted}
                width={2}
              >
                {index === selectedIndex ? '>' : ' '}
              </text>
              <text
                fg={index === selectedIndex ? theme.colors.text.primary : theme.colors.text.muted}
                width={20}
              >
                {item.label}
              </text>
              <text fg={theme.colors.text.muted} width={56}>
                {item.description}
              </text>
            </box>
          ))}
        </scrollbox>
      </box>

      <box
        borderStyle={theme.borders.style}
        borderColor={theme.colors.border}
        padding={theme.spacing.none}
        marginTop={1}
      >
        <text fg={theme.colors.text.muted}>Up/Down: Navigate | Enter: Select | ESC: Close</text>
      </box>
    </Modal>
  );
}
