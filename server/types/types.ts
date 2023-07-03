import { Player, SearchForArtistItem } from "../../shared/types";

// SOURCE: https://github.com/sdclarkelab/socket.io-countdown-timer
export interface Room {
  roomId: string;
  admin: string;
  duration: number;
  timerId: number | undefined;
  currentTime: number;
  isRunning: boolean;
  players: LinkedList<Player>;
  selectedArtists: SearchForArtistItem[];
}

// MODIFIED from: https://kenjj.medium.com/linked-list-with-typescript-ea8c88276e2e
export class Node<T> {
  public data: T | null;
  public next: Node<T> | null = null;
  public prev: Node<T> | null = null;
  constructor(data: T | null = null) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

export class LinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  public size: number = 0;

  constructor() {
    // Create a head and tail sentinel
    this.head = new Node<T>();
    this.tail = new Node<T>();

    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  public append(data: T): Node<T> {
    // These can't be null because of our sentinel initialization
    const newNode = new Node<T>(data);
    const prevNode = this.tail!.prev;

    prevNode!.next = newNode;
    newNode.prev = prevNode;

    newNode.next = this.tail;
    this.tail!.prev = newNode;

    this.size++;

    return newNode;
  }

  public delete(node: Node<T>): void {
    if (node === this.head || node === this.tail) {
      // Can't delete sentinels
      return;
    }

    // Again, we don't need to do any null checks because of our sentinels
    const prevNode = node.prev;
    const nextNode = node.next;

    this.size--;

    prevNode!.next = nextNode;
    nextNode!.prev = prevNode;
  }

  public getHead(): Node<T> | null {
    return this.size > 0 ? this.head!.next : null;
  }

  public traverse(): T[] {
    const array: T[] = [];
    let curr = this.head!.next;
    while (curr !== this.tail && curr !== null) {
      array.push(curr.data!);
      curr = curr.next;
    }

    return array;
  }
}
