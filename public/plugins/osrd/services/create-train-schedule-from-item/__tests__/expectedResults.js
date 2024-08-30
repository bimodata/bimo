module.exports = {
  expected1: {
    train_name: '1',
    labels: [],
    rolling_stock_name: 'electric_rolling_stock',
    start_time: '18:00',
    path: [
      { id: '0', deleted: false, uic: 'A', secondary_code: '' },
      { id: '1', deleted: false, uic: 'B', secondary_code: '' },
    ],
    schedule: [
      {
        at: '0',
        arrival: null,
        stop_for: 'P0D',
        on_stop_signal: false,
        locked: false,
      },
      {
        at: '1',
        arrival: '18:30',
        stop_for: 'P0D',
        on_stop_signal: false,
        locked: false,
      },
    ],
    margins: { boundaries: [], values: ['0%'] },
    initial_speed: 0,
    comfort: 'STANDARD',
    constraint_distribution: 'MARECO',
    speed_limit_tag: null,
    power_restrictions: [],
    options: { use_electrical_profiles: true },
  },
};
