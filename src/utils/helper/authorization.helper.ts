import { EAction, ESubject, IPermission } from '../types/authorization.type';

export class AuthorizationHelper {
  static expandAction = (action: EAction): EAction[] => {
    if (action === EAction.MANAGE) {
      return [EAction.MANAGE, EAction.READ, EAction.CREATE, EAction.UPDATE, EAction.DELETE];
    }
    return [action];
  };

  static isParentSubject = (parentSubject: ESubject, childSubject: ESubject): boolean => {
    if (parentSubject === childSubject) return true;
    return childSubject.startsWith(parentSubject + '.');
  };

  static hasPermission = (permissions: IPermission[], action: EAction, subject: ESubject): boolean => {
    if (!permissions || permissions.length === 0) return false;

    const requirePermissions = this.expandAction(action);

    return permissions.some((permission) => {
      const expandedActions = this.expandAction(permission.action);
      const actionMatches = requirePermissions.every((act) => expandedActions.includes(act));
      const subjectMatches = this.isParentSubject(permission.subject, subject);

      return actionMatches && subjectMatches;
    });
  };

  static hasAllPermissions = (
    currentPermisisons: IPermission[],
    permissions: Array<{ action: EAction; subject: ESubject }>,
  ): boolean => {
    return permissions.every((permission) =>
      this.hasPermission(currentPermisisons, permission.action, permission.subject),
    );
  };

  static hasAnyPermission = (
    currentPermisisons: IPermission[],
    permissions: Array<{ action: EAction; subject: ESubject }>,
  ): boolean => {
    return permissions.some((permission) =>
      this.hasPermission(currentPermisisons, permission.action, permission.subject),
    );
  };

  static checkPermissions = (
    currentPermisisons: IPermission[],
    permissions: Array<{ action: EAction; subject: ESubject }>,
    logic: 'AND' | 'OR' = 'AND',
  ): boolean => {
    if (logic === 'AND') {
      return this.hasAllPermissions(currentPermisisons, permissions);
    }
    return this.hasAnyPermission(currentPermisisons, permissions);
  };
}
