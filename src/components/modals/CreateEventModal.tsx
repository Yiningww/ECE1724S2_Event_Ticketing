'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Organizer = {
  id: string;
  name: string;
};

export default function CreateEventModal({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: (event: any) => void;
}) {
  const [organizers, setOrganizers] = useState<Organizer[]>([]);
  const [organizerId, setOrganizerId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [touchedStart, setTouchedStart] = useState(false);
  const [touchedEnd, setTouchedEnd] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const now = new Date();
    now.setMinutes(0, 0, 0);
    now.setHours(now.getHours() + 1);
    const end = new Date(now);
    end.setHours(end.getHours() + 1);

    const format = (d: Date) => d.toISOString().slice(0, 16);
    setStartDate(format(now));
    setEndDate(format(end));
  }, []);

  useEffect(() => {
    fetch('/api/organizers')
      .then((res) => res.json())
      .then((data) => {
        setOrganizers(data);
        setOrganizerId(data[0]?.id || '');
      });
  }, []);

  const handleSubmit = async () => {
    if (!name.trim() || !startDate || !endDate) {
      alert('Please fill in all required fields.');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      alert('Invalid date format');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        body: JSON.stringify({ name, description, startDate, endDate }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const msg = await res.text();
        alert(`Failed to create event: ${msg}`);
        return;
      }

      const json = await res.json();
      onCreated(json.event); // ✅ 通知父组件插入新事件
      onClose();             // ✅ 关闭弹窗

      // 清空表单
      setName('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      setTouchedStart(false);
      setTouchedEnd(false);
    } catch (err) {
      console.error('Create event error:', err);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create Event</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <Label>Event Name <span className="text-red-500">*</span></Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label>Description</Label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-1 rounded border px-3 py-2"
              rows={5}
              placeholder="Enter a description..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Start Date <span className="text-red-500">*</span></Label>
              <Input
                type="datetime-local"
                value={startDate}
                onFocus={() => setTouchedStart(true)}
                onChange={(e) => setStartDate(e.target.value)}
                className={`mt-1 w-full ${
                  !touchedStart ? 'text-gray-300' : 'text-gray-900'
                }`}
              />
            </div>
            <div>
              <Label>End Date <span className="text-red-500">*</span></Label>
              <Input
                type="datetime-local"
                value={endDate}
                onFocus={() => setTouchedEnd(true)}
                onChange={(e) => setEndDate(e.target.value)}
                className={`mt-1 w-full ${
                  !touchedEnd ? 'text-gray-300' : 'text-gray-900'
                }`}
              />
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-purple-700 hover:bg-purple-800 text-white"
          >
            {loading ? 'Creating...' : 'Submit'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}