import { Injectable } from '@angular/core';
import { LEADERS } from '../shared/leaders';
import { Leader } from '../shared/leader';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Promise<Leader[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(LEADERS), 2000);
    });
  }

  getLeader(id: string): Promise<Leader> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(LEADERS.find(leader => leader.id === id)), 2000);
    });
  }

  getFeaturedLeader(): Promise<Leader> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(LEADERS.find(leader => leader.featured)), 2000);
    });
  }
}
